import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CcByIcon, CcIcon, CcNcIcon, CcSaIcon } from "@/components/icons";

export function LicenseInfo() {
    return (
        <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <Link href={siteConfig.url} className="hover:opacity-60 transition-opacity">
                Anxiu
            </Link>
            . Licensed under{" "}
            <Link
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="license noopener noreferrer"
                className="underline hover:opacity-60 transition-opacity"
            >
                CC BY-NC-SA 4.0
            </Link>
            <span className="inline-flex items-center ml-1 align-middle">
              <CcIcon className="size-4" />
              <CcByIcon className="size-4" />
              <CcNcIcon className="size-4" />
              <CcSaIcon className="size-4" />
            </span>
        </p>
    )
}