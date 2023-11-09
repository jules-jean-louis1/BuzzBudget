function Header() {
    return (
        <>
        <header>
            <nav id='mobile' className="block md:hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <p>Retour</p>
                    </div>
                    <div>
                        <h1>BuzzBudget</h1>
                    </div>
                    <div>
                        <ul>
                            <li>
                                Contact
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        </>
    )
}

export default Header;