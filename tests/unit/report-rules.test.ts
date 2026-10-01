import assert from "node:assert/strict";
import { test } from "node:test";
import { authenticate } from "../../src/features/auth/service";
import type { User } from "../../src/features/auth/types";
import {
  applyReportAction,
  decodeReports,
} from "../../src/features/reports/repository";
import {
  filterReports,
  visibleReports,
} from "../../src/features/reports/selectors";
import { SEED_REPORTS } from "../../src/features/reports/seed";
import type { ReportInput } from "../../src/features/reports/types";

const student: User = { nim: "202020", name: "Arlan Satya", role: "student" };
const other: User = { nim: "2021999", name: "Arlan Satya", role: "student" };
const admin: User = { nim: "101010", name: "Admin Fasilitas", role: "admin" };
const input: ReportInput = {
  title: "  Lampu mati  ",
  category: "Listrik",
  location: "Gedung A",
  description: "Lampu ruang kelas tidak menyala.",
};

test("demo authentication derives role from account and never returns password", () => {
  assert.equal(authenticate("202020", "wrong"), null);
  assert.deepEqual(authenticate("202020", "campus123"), student);
  assert.equal(authenticate("101010", "admin123")?.role, "admin");
});
test("ownership uses NIM, including when two students share a name", () => {
  assert.equal(visibleReports(SEED_REPORTS, student).length, 3);
  assert.equal(visibleReports(SEED_REPORTS, other).length, 0);
  assert.equal(visibleReports(SEED_REPORTS, admin).length, 5);
});
test("create trims inputs and sets owner, dates and initial status", () => {
  const created = applyReportAction([], student, { type: "create", input })[0];
  assert.equal(created.title, "Lampu mati");
  assert.equal(created.author, student.nim);
  assert.equal(created.status, "reported");
  assert.equal(created.createdAt, created.updatedAt);
  assert.ok(created.id);
  assert.throws(() => applyReportAction([], admin, { type: "create", input }));
  assert.throws(() =>
    applyReportAction([], student, {
      type: "create",
      input: { ...input, title: " " },
    }),
  );
});
test("edit checks current status and ownership; preserves creation date", () => {
  const edited = applyReportAction(SEED_REPORTS, student, {
    type: "edit",
    id: "seed-2",
    input,
  });
  assert.equal(
    edited.find((r) => r.id === "seed-2")?.createdAt,
    SEED_REPORTS[1].createdAt,
  );
  assert.equal(edited.find((r) => r.id === "seed-2")?.title, "Lampu mati");
  assert.throws(() =>
    applyReportAction(SEED_REPORTS, other, {
      type: "edit",
      id: "seed-2",
      input,
    }),
  );
  assert.throws(() =>
    applyReportAction(SEED_REPORTS, admin, {
      type: "edit",
      id: "seed-2",
      input,
    }),
  );
  assert.throws(() =>
    applyReportAction(SEED_REPORTS, student, {
      type: "edit",
      id: "seed-1",
      input,
    }),
  );
});
test("only admins can progress status, without skips or reverse transitions", () => {
  const processing = applyReportAction(SEED_REPORTS, admin, {
    type: "status",
    id: "seed-2",
    status: "processing",
  });
  const done = applyReportAction(processing, admin, {
    type: "status",
    id: "seed-2",
    status: "done",
  });
  assert.equal(done.find((r) => r.id === "seed-2")?.status, "done");
  assert.throws(() =>
    applyReportAction(SEED_REPORTS, admin, {
      type: "status",
      id: "seed-2",
      status: "done",
    }),
  );
  assert.throws(() =>
    applyReportAction(done, admin, {
      type: "status",
      id: "seed-2",
      status: "reported",
    }),
  );
  assert.throws(() =>
    applyReportAction(SEED_REPORTS, student, {
      type: "status",
      id: "seed-2",
      status: "processing",
    }),
  );
});
test("students delete only their own reports; admins can delete any", () => {
  assert.equal(
    applyReportAction(SEED_REPORTS, student, { type: "delete", id: "seed-2" })
      .length,
    4,
  );
  assert.throws(() =>
    applyReportAction(SEED_REPORTS, student, { type: "delete", id: "seed-3" }),
  );
  assert.equal(
    applyReportAction(SEED_REPORTS, admin, { type: "delete", id: "seed-3" })
      .length,
    4,
  );
});
test("search, status and category intersect and results sort newest first", () => {
  const result = filterReports(SEED_REPORTS, {
    query: " PERPUSTAKAAN ",
    status: "reported",
    category: "Wi-Fi",
  });
  assert.deepEqual(
    result.map((r) => r.id),
    ["seed-2"],
  );
  assert.equal(
    filterReports(SEED_REPORTS, {
      query: "perpustakaan",
      status: "done",
      category: "Wi-Fi",
    }).length,
    0,
  );
  assert.equal(
    filterReports(SEED_REPORTS, {
      query: "",
      status: "all",
      category: "all",
    })[0].id,
    "seed-4",
  );
});
test("storage accepts an empty collection and rejects malformed records", () => {
  assert.deepEqual(decodeReports("[]"), []);
  assert.deepEqual(decodeReports(JSON.stringify(SEED_REPORTS)), SEED_REPORTS);
  assert.throws(() => decodeReports("{}"));
  assert.throws(() =>
    decodeReports(JSON.stringify([{ ...SEED_REPORTS[0], status: "invalid" }])),
  );
  assert.throws(() =>
    decodeReports(
      JSON.stringify([{ ...SEED_REPORTS[0], createdAt: "invalid" }]),
    ),
  );
  assert.throws(() =>
    decodeReports(JSON.stringify([SEED_REPORTS[0], SEED_REPORTS[0]])),
  );
});
