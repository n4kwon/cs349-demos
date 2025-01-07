import { ComponentChildren } from "preact";
// some imports used for other demos
import { signal } from "@preact/signals";
import { useEffect, useMemo, useState } from "preact/hooks";

type CollapsibleProps = {
  open?: boolean;
  label: string;
  children: ComponentChildren;
};

export function Collapsible({
  open: startOpen = false,
  label,
  children,
}: CollapsibleProps) {
  // component state
  const [isOpen, setIsOpen] = useState(startOpen);

  console.log(`🖼️ Collapsible '${label}' isOpen=${isOpen}`);

  return (
    <div>
      <p
        style={{
          background: "whitesmoke",
          cursor: "pointer",
          padding: "5px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "[-]" : "[+]"} {label}
      </p>

      {isOpen && <div class="content">{children}</div>}
    </div>
  );
}
