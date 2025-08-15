"use client";

import Button from "@/components/Button";
import ArrowIcon from "../../../../components/icon/ArrowIcon";
import SidebarContent from "./SidebarContent";
import "./sidebar.css";

export default function ClientSidebar({ isOpen, onClose }) {
  const overlayClasses = isOpen
    ? "sidebar-overlay-open"
    : "sidebar-overlay-closed";
  const sidebarClasses = isOpen ? "sidebar-open" : "sidebar-closed";

  return (
    <>
      <div
        className={`sidebar-overlay ${overlayClasses}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`sidebar-container ${sidebarClasses}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="القائمة الجانبية"
      >
        <div className="flex-shrink-0 p-3 pb-0">
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11"
            onClick={onClose}
          >
            <ArrowIcon className="h-5 w-5" />
          </Button>
        </div>
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}
