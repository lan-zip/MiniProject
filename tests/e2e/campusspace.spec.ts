import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function login(page: Page, role: "student" | "admin" = "student") {
  await page.getByRole("button", { name: "Masuk", exact: true }).click();
  await page
    .getByLabel("NIM", { exact: true })
    .fill(role === "student" ? "202020" : "101010");
  await page
    .getByLabel("Password", { exact: true })
    .fill(role === "student" ? "campus123" : "admin123");
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Masuk", exact: true })
    .click();
  await expect(page).toHaveURL(new RegExp(`/dashboard/${role}$`));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
}

test("login validation, keyboard, modal focus and feature tabs", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("tab")).toHaveCount(2);
  await expect(page.getByText("Design System", { exact: true })).toHaveCount(0);
  await expect(
    page.getByText("Suara mahasiswa, kampus lebih nyaman"),
  ).toHaveCount(0);
  await expect(page.getByText("BARU", { exact: true })).toHaveCount(0);
  await expect(page.getByText(/Lapor, pantau, selesai/)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Coba sekarang" })).toHaveCount(
    0,
  );
  const trigger = page.getByRole("button", { name: "Mulai Melapor" });
  await trigger.click();
  await expect(page.getByLabel("NIM", { exact: true })).toBeFocused();
  await expect(page.getByLabel("NIM", { exact: true })).toHaveAttribute(
    "placeholder",
    "Masukkan NIM",
  );
  await expect(page.getByRole("dialog")).not.toContainText(
    /demo|202020|101010|campus123|admin123/i,
  );
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Masuk", exact: true })
    .click();
  await expect(page.getByRole("dialog").getByRole("alert")).toContainText(
    "wajib diisi",
  );
  await page.getByLabel("NIM", { exact: true }).fill("202020");
  await page.getByLabel("Password", { exact: true }).fill("incorrect");
  await page.getByLabel("Lihat password", { exact: true }).click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  await page.getByLabel("Password", { exact: true }).press("Enter");
  await expect(page.getByRole("dialog").getByRole("alert")).toHaveText(
    "NIM atau password salah",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page.getByRole("tab", { name: "Untuk Mahasiswa" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Untuk Admin" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(
    page.getByRole("heading", { name: "Dashboard ringkas" }),
  ).toBeVisible();
  await trigger.click();
  await page.mouse.click(5, 5);
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("student CRUD, filters, refresh persistence, and admin workflow", async ({
  page,
}) => {
  await page.goto("/");
  await login(page);
  await expect(page.getByRole("article")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "Lampu koridor mati" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Buat Laporan", exact: true }).click();
  await page.getByRole("button", { name: "Kirim Laporan" }).click();
  await expect(page.getByText("Judul wajib diisi.")).toBeVisible();
  await page.getByLabel("Judul laporan").fill("Lampu ruang diskusi mati");
  await page.getByLabel("Kategori", { exact: true }).selectOption("Listrik");
  await page.getByLabel("Lokasi", { exact: true }).fill("Gedung D, Lantai 1");
  await page
    .getByLabel("Deskripsi masalah")
    .fill("Dua lampu ruang diskusi tidak menyala.");
  await page.getByRole("button", { name: "Kirim Laporan" }).click();
  await expect(
    page.getByRole("heading", { name: "Lampu ruang diskusi mati" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Edit Lampu ruang diskusi mati", exact: true })
    .click();
  await page
    .getByLabel("Judul laporan")
    .fill("Lampu ruang diskusi perlu diganti");
  await page.getByRole("button", { name: "Simpan", exact: true }).click();
  await page.getByLabel("Cari laporan").fill("diskusi");
  await page.getByLabel("Filter kategori").selectOption("Listrik");
  await page.getByRole("button", { name: "Dilaporkan", exact: true }).click();
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Lampu ruang diskusi perlu diganti" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Keluar", exact: true }).click();
  await login(page, "admin");
  const status = page
    .getByLabel("Status Lampu ruang diskusi perlu diganti")
    .filter({ visible: true });
  await status.selectOption("processing");
  await expect(status).toHaveValue("processing");
  await expect(status.locator('option[value="reported"]')).toHaveCount(0);
  await status.selectOption("done");
  await expect(status).toBeDisabled();
  await page.getByRole("button", { name: "Keluar", exact: true }).click();
  await login(page);
  const card = page.getByRole("article").filter({
    has: page.getByRole("heading", {
      name: "Lampu ruang diskusi perlu diganti",
    }),
  });
  await expect(card.getByText("Selesai", { exact: true })).toBeVisible();
  await expect(card.getByRole("button", { name: /^Edit/ })).toHaveCount(0);
  await card.getByRole("button", { name: /^Hapus/ }).click();
  await page.getByRole("button", { name: "Batal", exact: true }).click();
  await expect(card).toBeVisible();
  await card.getByRole("button", { name: /^Hapus/ }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Hapus", exact: true })
    .click();
  await expect(card).toHaveCount(0);
});

test("all reports deleted stay empty after refresh", async ({ page }) => {
  await page.goto("/");
  await login(page, "admin");
  for (let index = 0; index < 5; index++) {
    await page
      .getByRole("table")
      .getByRole("button", { name: /^Hapus/ })
      .first()
      .click();
    await page
      .getByRole("dialog")
      .getByRole("button", { name: "Hapus", exact: true })
      .click();
  }
  await expect(
    page.getByRole("heading", { name: "Belum ada laporan" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Belum ada laporan" }),
  ).toBeVisible();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("campusspace.reports.v1")!),
    ),
  ).toEqual([]);
});

test("role routes redirect, category and empty filters work", async ({
  page,
}) => {
  await page.goto("/dashboard/admin");
  await expect(page).toHaveURL("/");
  await login(page);
  await page.goto("/dashboard/admin");
  await expect(page).toHaveURL("/dashboard/student");
  await page.getByLabel("Filter kategori").selectOption("AC");
  await expect(page.getByRole("article")).toHaveCount(1);
  await page.getByRole("button", { name: "Selesai", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Belum ada hasil yang cocok" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filter", exact: true }).click();
  await expect(page.getByRole("article")).toHaveCount(3);
});

test("responsive layouts, light-only appearance and accessibility", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() =>
    localStorage.setItem("campusspace.theme", "dark"),
  );
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.getByRole("button", { name: /Aktifkan tema/ })).toHaveCount(
    0,
  );
  await expect(page.locator("html")).not.toHaveAttribute("data-theme");
  await expect(page.locator("html")).toHaveCSS("color-scheme", "light");
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(243, 246, 255)",
  );
  await page.reload();
  await expect(page.locator("body")).toHaveCSS(
    "background-color",
    "rgb(243, 246, 255)",
  );
  let audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.getByRole("button", { name: "Masuk", exact: true }).click();
  audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await login(page, "admin");
  await expect(page.getByRole("table")).not.toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(5);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  for (const width of [768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole("table")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
