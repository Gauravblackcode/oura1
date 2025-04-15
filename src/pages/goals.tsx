import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Navigation from '@/components/navigation/Navigation';
const GoalsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Goals | Oura 1</title>
        <meta name="description" content="Goals management for Oura 1" />
      </Head>
      <main>
        <div style={{
          height: "1024px",
          background: "white",
          overflow: "hidden",
          borderRadius: "8px",
          outline: "2px #CED4DA solid",
          outlineOffset: "-2px",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "inline-flex",
          width: "100%"
        }}>
          <div style={{
            width: "100%",
            height: "1024px",
            position: "relative",
            background: "rgba(0, 0, 0, 0)"
          }}>
            <div style={{
              width: "100%",
              height: "1024px",
              left: "0px",
              top: "0px",
              display: "flex",
              position: "relative",
              background: "#F9FAFB"
            }}>
              {/* Sidebar */}
              <Navigation />

              {/* Main Content */}
              <div style={{
                // marginLeft: "256px",
                padding: "30px",
                width: "100%"
              }}>
                {/* Search Bar */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "24px",
                  marginBottom: "30px"
                }}>
                  <div style={{
                    flex: 1,
                    position: "relative"
                  }}>
                    <div style={{
                      width: "100%",
                      height: "50px",
                      background: "white",
                      borderRadius: "12px",
                      border: "1px #E5E7EB solid",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 16px"
                    }}>
                      <span style={{ marginRight: "12px" }}>🔍</span>
                      <input
                        type="text"
                        placeholder="Search across conversations and content..."
                        style={{
                          border: "none",
                          outline: "none",
                          width: "100%",
                          fontSize: "16px",
                          fontFamily: "var(--font-primary)",
                          color: "#ADAEBC"
                        }}
                      />
                    </div>
                  </div>
                  <div style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    border: "1px #E5E7EB solid",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}>
                    <span>🔔</span>
                  </div>
                </div>

                {/* Content Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px"
                }}>
                  {/* Smart Scheduling Card */}
                  <div style={{
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px",
                    height: "160px"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px"
                    }}>
                      <h2 style={{
                        color: "black",
                        fontSize: "18px",
                        fontFamily: "var(--font-primary)",
                        fontWeight: 600,
                        lineHeight: "27px"
                      }}>
                        Smart Scheduling
                      </h2>
                      <button style={{
                        background: "#D24D21",
                        color: "white",
                        border: "none",
                        borderRadius: "100px",
                        padding: "10px 24px",
                        fontSize: "14px",
                        fontFamily: "var(--font-primary)",
                        fontWeight: 500,
                        cursor: "pointer"
                      }}>
                        + Add New
                      </button>
                    </div>
                    <p style={{
                      color: "black",
                      fontSize: "16px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 400,
                      lineHeight: "24px"
                    }}>
                      Suggests optimal times for tasks based on habits and patterns.
                    </p>
                  </div>

                  {/* AI-Powered Goal Breakdown Card */}
                  <div style={{
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px",
                    height: "160px"
                  }}>
                    <h2 style={{
                      color: "black",
                      fontSize: "18px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 600,
                      lineHeight: "27px",
                      marginBottom: "16px"
                    }}>
                      AI-Powered Goal Breakdown
                    </h2>
                    <p style={{
                      color: "black",
                      fontSize: "16px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 400,
                      lineHeight: "24px"
                    }}>
                      Generate concise summaries of meetings and notes.
                    </p>
                  </div>

                  {/* Personalized Task Recommendations Card */}
                  <div style={{
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px",
                    height: "243px"
                  }}>
                    <h2 style={{
                      color: "black",
                      fontSize: "18px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 600,
                      lineHeight: "27px",
                      marginBottom: "16px"
                    }}>
                      Personalized Task Recommendations
                    </h2>
                    <p style={{
                      color: "black",
                      fontSize: "16px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 400,
                      lineHeight: "24px",
                      marginBottom: "16px"
                    }}>
                      Recommend tasks aligns with your personality.
                    </p>
                    <button style={{
                      background: "#D24D21",
                      color: "white",
                      border: "none",
                      borderRadius: "100px",
                      padding: "10px 24px",
                      fontSize: "14px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 500,
                      cursor: "pointer"
                    }}>
                      + Add New
                    </button>
                  </div>

                  {/* Summarized Notes Card */}
                  <div style={{
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px",
                    height: "227px"
                  }}>
                    <h2 style={{
                      color: "black",
                      fontSize: "18px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 600,
                      lineHeight: "27px",
                      marginBottom: "16px"
                    }}>
                      Summarized Notes
                    </h2>
                    <div style={{
                      background: "#F8FBFF",
                      borderRadius: "4px",
                      padding: "12px",
                      marginBottom: "16px"
                    }}>
                      <h3 style={{
                        color: "black",
                        fontSize: "16px",
                        fontFamily: "var(--font-primary)",
                        fontWeight: 600,
                        lineHeight: "24px",
                        marginBottom: "8px"
                      }}>
                        Marketing Strategies
                      </h3>
                      <p style={{
                        color: "black",
                        fontSize: "14px",
                        fontFamily: "var(--font-primary)",
                        fontWeight: 400,
                        lineHeight: "21px",
                        marginBottom: "8px"
                      }}>
                        Focus on social media channels.
                        Refine target audience segmentation.
                      </p>
                      <a href="#" style={{
                        color: "#4C9AFF",
                        fontSize: "12px",
                        fontFamily: "var(--font-primary)",
                        fontWeight: 400,
                        lineHeight: "18px",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center"
                      }}>
                        <span style={{ marginRight: "8px" }}>→</span>
                        Link to full note
                      </a>
                    </div>
                    <a href="#" style={{
                      color: "#D24D21",
                      fontSize: "12px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 400,
                      textDecoration: "underline"
                    }}>
                      More Notes
                    </a>
                  </div>

                  {/* Analytics Card */}
                  <div style={{
                    background: "white",
                    borderRadius: "10px",
                    padding: "16px",
                    height: "125px"
                  }}>
                    <h2 style={{
                      color: "black",
                      fontSize: "18px",
                      fontFamily: "var(--font-primary)",
                      fontWeight: 600,
                      lineHeight: "27px",
                      marginBottom: "16px"
                    }}>
                      Analytics
                    </h2>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                      }}>
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          border: "8px #F3F6FF solid",
                          borderTop: "14px #1FC16B solid",
                          transform: "rotate(57deg)"
                        }} />
                        <div>
                          <div style={{
                            color: "#1FC16B",
                            fontSize: "32px",
                            fontFamily: "var(--font-primary)",
                            fontWeight: 400
                          }}>
                            82%
                          </div>
                          <div style={{
                            color: "#434A5E",
                            fontSize: "12px",
                            fontFamily: "var(--font-primary)",
                            fontWeight: 400,
                            lineHeight: "20px"
                          }}>
                            Tasks Completed
                          </div>
                        </div>
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                      }}>
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          border: "8px #F3F6FF solid",
                          borderTop: "14px #CA1414 solid",
                          transform: "rotate(-80deg)"
                        }} />
                        <div>
                          <div style={{
                            color: "#CA1414",
                            fontSize: "32px",
                            fontFamily: "var(--font-primary)",
                            fontWeight: 400
                          }}>
                            26%
                          </div>
                          <div style={{
                            color: "#434A5E",
                            fontSize: "12px",
                            fontFamily: "var(--font-primary)",
                            fontWeight: 400,
                            lineHeight: "22px"
                          }}>
                            Pending Tasks
                          </div>
                        </div>
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px"
                      }}>
                        <div style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "50%",
                          border: "8px #F3F6FF solid",
                          borderTop: "14px #DFB400 solid",
                          transform: "rotate(57deg)"
                        }} />
                        <div>
                          <div style={{
                            color: "#DFB400",
                            fontSize: "32px",
                            fontFamily: "var(--font-primary)",
                            fontWeight: 400
                          }}>
                            3
                          </div>
                          <div style={{
                            color: "#434A5E",
                            fontSize: "12px",
                            fontFamily: "var(--font-primary)",
                            fontWeight: 400,
                            lineHeight: "22px"
                          }}>
                            Goals Achieved
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div style={{
                    background: "white",
                    borderRadius: "10px",
                    padding: "24px",
                    height: "196px"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "16px"
                    }}>
                      <Image
                        src="/images/OURA.1 - Aime Icon [.png].png"
                        alt="AI Assistant"
                        width={70}
                        height={70}
                        style={{ marginRight: "24px" }}
                      />
                      <div>
                        <h2 style={{
                          color: "black",
                          fontSize: "20px",
                          fontFamily: "var(--font-primary)",
                          fontWeight: 700,
                          lineHeight: "20px",
                          marginBottom: "8px"
                        }}>
                          Hi Michael!
                        </h2>
                        <p style={{
                          color: "black",
                          fontSize: "16px",
                          fontFamily: "var(--font-primary)",
                          fontWeight: 400,
                          lineHeight: "20px"
                        }}>
                          How can I assist you?
                        </p>
                      </div>
                    </div>
                    <div style={{
                      position: "relative",
                      marginTop: "24px"
                    }}>
                      <input
                        type="text"
                        placeholder="Type here..."
                        style={{
                          width: "100%",
                          height: "56px",
                          border: "1px #79747E solid",
                          borderRadius: "4px",
                          padding: "0 16px",
                          fontSize: "16px",
                          fontFamily: "var(--font-primary)",
                          color: "#1D1B20"
                        }}
                      />
                      <button style={{
                        position: "absolute",
                        right: "8px",
                        top: "8px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "1px #79747E solid",
                        background: "transparent",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default GoalsPage; 