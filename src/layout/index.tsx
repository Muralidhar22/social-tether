import { ReactElement, JSXElementConstructor } from 'react';
import Link from 'next/link';

import Logo from "@/components/Logo";
import DarkModeToggle from '@/components/DarkModeToggle';



type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="p-5">
        <nav className="flex justify-between items-center">
        <Logo />
            <div className="flex gap-5 item-center">
                <DarkModeToggle />
                <Link href="/new/post">New post</Link>
            </div>
        </nav>
            {children}
        </div>
    )
}

const getLayout = (page: ReactElement<any, string | JSXElementConstructor<any>>) => {
    return (
      <Layout>
        {page}
      </Layout>
    )
}

export default getLayout;