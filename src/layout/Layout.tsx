import Logo from "@/components/Logo";

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
        <nav>
        <Logo />
        </nav>
            {children}
        </>
    )
}

export default Layout;