import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@/lib/icons';
import styles from './header.module.scss';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface HeaderProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, breadcrumbs, showBackButton = true }) => {
    const router = useRouter();
    const [showSearch, setShowSearch] = useState(false);

    const handleBack = () => {
        if (breadcrumbs.length > 1 && breadcrumbs[breadcrumbs.length - 2].path) {
            router.push(breadcrumbs[breadcrumbs.length - 2].path as string);
        } else {
            router.back();
        }
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerTop}>
                <button
                    onClick={handleBack}
                    className={styles.backButton}
                >
                    {showBackButton && (
                        <ChevronRightIcon
                            style={{
                                marginRight: "8px",
                                transform: "rotate(180deg)"
                            }}
                            size={20}
                        />
                    )}
                    <span className={styles.headerTitle}>
                        {title}
                    </span>
                </button>

                <div className={styles.headerActions}>
                    {/* Search icon for mobile */}
                    <div className={styles.searchIconMobile} onClick={toggleSearch}>
                        <span>🔍</span>
                    </div>

                    {/* Search input - hidden on mobile by default */}
                    <div className={`${styles.searchContainer} ${showSearch ? styles.showSearch : ''}`}>
                        <div className={styles.searchInputContainer}>
                            <span style={{ marginRight: "8px" }}>🔍</span>
                            <input
                                type="text"
                                placeholder="Search anything here..."
                                className={styles.searchInput}
                            />
                        </div>
                    </div>

                    <div className={styles.notificationContainer}>
                        <span style={{ fontSize: "18px" }}>🔔</span>
                        <span className={styles.notificationBadge}>
                            1
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.breadcrumbs}>
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        <span
                            onClick={() => item.path && router.push(item.path)}
                            className={`${styles.breadcrumbItem} ${index === breadcrumbs.length - 1 ? styles.activeBreadcrumb : ''}`}
                        >
                            {item.label}
                        </span>
                        {index < breadcrumbs.length - 1 && (
                            <span className={styles.breadcrumbSeparator}>/</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Header;