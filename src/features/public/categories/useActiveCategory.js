"use client";

import { useEffect, useState } from "react";

export function useActiveCategory(groups) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const sections = groups
      .map((group) => {
        const el = document.getElementById(`group-${group.id}`);
        return { id: `group-${group.id}`, element: el };
      })
      .filter(({ element }) => element);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { threshold: 0.5 },
    );

    sections.forEach(({ element }) => {
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(({ element }) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [groups]);

  return activeId;
}
