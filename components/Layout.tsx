import { FC } from 'react'
import Link from 'next/link'

const Layout: FC<{ children: JSX.Element }> = ({ children }) => {
    return (
        <div>
            <header>
                <Link href="/">
                    <a>
                        <h1>
                            <span>Your Name</span>
                            <span>My Blog</span>
                        </h1>
                        <h2>Subtitle Here</h2>
                    </a>
                </Link>
            </header>

            <div className="page-content">
                {children}
            </div>

            <footer>
                <p>Copyright 2021 Just Add Marmite :)</p>
            </footer>
        </div>
    )
}

export default Layout