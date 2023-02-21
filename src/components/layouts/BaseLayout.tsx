import { Header } from "@/components/partials";

export interface BaseLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
}

const BaseLayout = ({ children, showHeader = true }: BaseLayoutProps) => {
    return (
        <main className="h-screen overflow-y-scroll bg-slate-200">
            {showHeader && <Header />}
            <div className="app">{children}</div>
        </main>
    );
};

export default BaseLayout;
