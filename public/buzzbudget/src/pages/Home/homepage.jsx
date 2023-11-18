function Homepage() {
    return (
        <>
            <div style={{background: "linear-gradient(140deg, #FF2E00, #FD9D58)"}} className="h-screen">
                <div className="px-5">
                    <div className="w-[90%] flex flex-col">
                        <p className="text-2xl">Gérez votre budget plus facilement et rapidement que jamais</p>
                    </div>
                    <div>
                        <div className="">
                            <button type="button" className="bg-yellow-50 rounded-3xl flex items-center justify-between w-full h-28 px-2">
                                <span className="text-xl">Commencer</span>
                                <span className="bg-[#0E1217] rounded-full p-3 text-white">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_5_232)">
                                        <path d="M1 12L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11 20L20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M11 3L20 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_5_232">
                                        <rect width="24" height="24" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div>
                            <button type="button" className="bg-[#0E1217] flex items-center justify-between w-full px-2 rounded-2xl h-16">
                                <span className="text-slate-50">Connexion</span>
                                <span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_5_248)">
                                        <path d="M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z" stroke="#8E8E92" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="#8E8E92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_5_248">
                                        <rect width="24" height="24" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                            </button>
                            <div className="rounded-b-xl h-20">
                                <p className="text-center text-xs">En rejoignant BuzzBudget, vous acceptez nos termes de service et notre politique de confidentialité.</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Homepage;