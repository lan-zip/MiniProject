import { Building2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="page-container mt-auto py-8">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-xs text-muted sm:flex-row">
        <span className="flex items-center gap-2 font-semibold text-text">
          <Building2 size={17} className="text-primary" />
          CampusSpace
          <span className="ml-1 font-normal text-muted">
            © {new Date().getFullYear()}
          </span>
        </span>
        <p> </p>
        <span className="flex items-center gap-1.5">
          Untuk kampus yang lebih baik{" "}
          <Heart size={13} className="text-primary" />
        </span>
      </div>
    </footer>
  );
}
