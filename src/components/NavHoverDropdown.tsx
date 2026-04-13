import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const CLOSE_DELAY_MS = 140;

type Item = { label: string; to: string };

type NavHoverDropdownProps = {
  label: string;
  triggerClassName: string;
  items: readonly Item[];
  align?: "start" | "end";
  contentClassName?: string;
};

/**
 * Menu déroulant ouvert au survol (desktop). Clic et clavier restent pris en charge par Radix.
 */
const NavHoverDropdown = ({
  label,
  triggerClassName,
  items,
  align = "start",
  contentClassName,
}: NavHoverDropdownProps) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    cancelClose();
    setOpen(true);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <div className="relative flex" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
        <DropdownMenuTrigger
          className={cn(
            triggerClassName,
            "cursor-pointer border-0 bg-transparent shadow-none outline-none hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
          )}
        >
          {label}
          <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent
        align={align}
        side="bottom"
        sideOffset={6}
        className={contentClassName}
        onPointerEnter={openMenu}
        onPointerLeave={scheduleClose}
      >
        {items.map((item) => (
          <DropdownMenuItem key={item.to} asChild>
            <Link to={item.to}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavHoverDropdown;
