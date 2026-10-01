import { useEffect, useRef, useState } from "react";
import AppLink from "@/components/ui/AppLink";
import { cx } from "@/lib/styles";
import { useLocation } from "react-router-dom";
import { links } from "@/data/home";
import Button from "@/components/ui/Button";
import styles from "./Header.module.css";
export default function Header() {
  const { pathname } = useLocation();
  const isOlivePage =
    pathname === links.olive ||
    pathname.startsWith(`${links.olive}/`) ||
    pathname === links.aiExperience;
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 8);
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1200px)").matches) setMenuOpen(false);
    };
    const handleOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointerdown", handleOutside);
    updateScroll();
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handleOutside);
    };
  }, []);
  return (
    <>
      <header
        ref={headerRef}
        className={cx(styles, [
          "site-header",
          { "is-scrolled": scrolled, "is-menu-open": menuOpen },
        ])}
        data-site-header
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          if (dropdownOpen) dropdownTriggerRef.current?.focus();
          else if (menuOpen) menuTriggerRef.current?.focus();
          setMenuOpen(false);
          setDropdownOpen(false);
        }}
      >
        <div className={cx(styles, "header-inner")}>
          <AppLink
            className={cx(styles, "brand")}
            href="/"
            aria-label="CodeSquad 홈"
          >
            <img
              className={cx(styles, "brand-logo brand-logo-default")}
              src="/assets/img/illusts/header/signiture/home2.svg"
              alt="CodeSquad"
            />
            <img
              className={cx(styles, "brand-logo brand-logo-scrolled")}
              src="/assets/img/illusts/header/signiture/home1.svg"
              alt=""
              aria-hidden="true"
            />
          </AppLink>
          <nav className={cx(styles, "desktop-nav")} aria-label="주요 메뉴">
            <AppLink
              className={cx(styles, "typo-body-sm")}
              href={links.masters}
            >
              마스터즈
            </AppLink>
            <AppLink className={cx(styles, "typo-body-sm")} href={links.olive}>
              AI 배우고 써보기
            </AppLink>
            <div
              className={cx(styles, [
                "nav-dropdown",
                { "is-open": dropdownOpen },
              ])}
              data-nav-dropdown
              onPointerEnter={() => setDropdownOpen(true)}
              onPointerLeave={() => setDropdownOpen(false)}
              onFocus={() => setDropdownOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setDropdownOpen(false);
              }}
            >
              <button
                className={cx(styles, "nav-dropdown-trigger typo-body-sm")}
                type="button"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                ref={dropdownTriggerRef}
                onClick={() => setDropdownOpen(true)}
                data-nav-dropdown-trigger
              >
                기업 교육
              </button>
              <div className={cx(styles, "nav-dropdown-menu")} role="menu">
                <AppLink
                  className={cx(styles, "typo-body-sm")}
                  href={links.partners}
                  role="menuitem"
                >
                  LC (Learning Consulting)
                </AppLink>
              </div>
            </div>
            <AppLink
              className={cx(styles, "typo-body-sm")}
              href={links.learningMethod}
            >
              교육과 학습법
            </AppLink>
            <AppLink className={cx(styles, "typo-body-sm")} href={links.about}>
              회사 소개
            </AppLink>
          </nav>
          <div className={cx(styles, "header-cta header-cta-inline")}>
            <Button
              label={isOlivePage ? "올리브 구경하기" : "문의하기"}
              href={isOlivePage ? "https://olive.codesquad.kr" : links.email}
              status="accent"
              icon={isOlivePage ? "right" : "none"}
            />
          </div>
          <button
            className={cx(styles, "mobile-menu-button")}
            type="button"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            ref={menuTriggerRef}
            onClick={() => setMenuOpen((value) => !value)}
            data-mobile-menu-trigger
          >
            <span
              className={cx(styles, "mobile-menu-icon")}
              aria-hidden="true"
            ></span>
          </button>
        </div>
        <nav
          className={cx(styles, "mobile-nav")}
          id="mobile-nav"
          aria-label="모바일 주요 메뉴"
          data-mobile-nav
          hidden={!menuOpen}
          onClick={(event) => {
            if ((event.target as Element).closest("a")) setMenuOpen(false);
          }}
        >
          <AppLink className={cx(styles, "typo-bold-md")} href={links.masters}>
            마스터즈
          </AppLink>
          <AppLink className={cx(styles, "typo-bold-md")} href={links.olive}>
            AI 배우고 써보기
          </AppLink>
          <div className={cx(styles, "mobile-nav-group")}>
            <span className={cx(styles, "typo-body-sm")}>기업 교육</span>
            <AppLink
              className={cx(styles, "typo-bold-md")}
              href={links.partners}
            >
              LC (Learning Consulting)
            </AppLink>
          </div>
          <AppLink
            className={cx(styles, "typo-bold-md")}
            href={links.learningMethod}
          >
            교육과 학습법
          </AppLink>
          <AppLink className={cx(styles, "typo-bold-md")} href={links.about}>
            회사 소개
          </AppLink>
          <div className={cx(styles, "header-cta header-cta-mobile")}>
            <Button
              label={isOlivePage ? "올리브 구경하기" : "문의하기"}
              href={isOlivePage ? "https://olive.codesquad.kr" : links.email}
              status="accent"
              icon={isOlivePage ? "right" : "none"}
            />
          </div>
        </nav>
      </header>
    </>
  );
}
