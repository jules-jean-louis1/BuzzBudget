import LoginRegister from "../button/loginRegister";

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
                        <ul className="flex items-center">
                            <li>
                                <LoginRegister />
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