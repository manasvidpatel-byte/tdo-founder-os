import "./globals.css";
import {Sidebar} from "@/lib/sidebar";
export default function RootLayout({children}:{children:React.ReactNode}){return <div className="shell flex"><Sidebar/><main className="min-w-0 flex-1">{children}</main></div>}