import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@/lib/icons';

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

    const handleBack = () => {
        if (breadcrumbs.length > 1 && breadcrumbs[breadcrumbs.length - 2].path) {
            router.push(breadcrumbs[breadcrumbs.length - 2].path as string);
        } else {
            router.back();
        }
    };

    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "16px 0",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px"
            }}>
                <button
                    onClick={handleBack}
                    style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                        color: "#111827",
                        fontSize: "16px",
                        fontWeight: "500"
                    }}
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
                    <span style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        fontFamily: "'Baloo 2', cursive",
                        lineHeight: "32px",
                        letterSpacing: "0px",
                        textAlign: "center"
                    }}>
                        {title}
                    </span>
                </button>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px"
                }}>
                    <div style={{
                        position: "relative",
                        width: "300px"
                    }}>
                        <div style={{
                            width: "100%",
                            height: "40px",
                            background: "white",
                            borderRadius: "6px",
                            border: "1px #E5E7EB solid",
                            display: "flex",
                            alignItems: "center",
                            padding: "0 12px"
                        }}>
                            <span style={{ marginRight: "8px" }}>🔍</span>
                            <input
                                type="text"
                                placeholder="Search anything here..."
                                style={{
                                    border: "none",
                                    outline: "none",
                                    width: "100%",
                                    fontSize: "14px",
                                    color: "#4B5563"
                                }}
                            />
                        </div>
                    </div>

                    <div style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "white",
                        borderRadius: "6px",
                        border: "1px #E5E7EB solid",
                        cursor: "pointer",
                        position: "relative"
                    }}>
                        <span style={{ fontSize: "18px" }}>🔔</span>
                        <span style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            background: "#EF4444",
                            color: "white",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            1
                        </span>
                    </div>
                </div>
            </div>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
            }}>
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        <span
                            onClick={() => item.path && router.push(item.path)}
                            style={{
                                cursor: item.path ? "pointer" : "default",
                                color: index === breadcrumbs.length - 1 ? "#D24D21" : "#6B7280",
                                fontSize: "14px",
                                fontWeight: index === breadcrumbs.length - 1 ? "700" : "400",
                                fontFamily: "'Montserrat', sans-serif"
                            }}
                        >
                            {item.label}
                        </span>
                        {index < breadcrumbs.length - 1 && (
                            <span style={{
                                color: "#6B7280",
                                fontSize: "14px",
                                fontFamily: "'Montserrat', sans-serif"
                            }}>/</span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Header;