const LoginForm = () => {
  return (
    <form action="" method="post" className="px-2">
      <div className="flex flex-col">
        <div className="border-2 border-b-0 border-[#4A4A4A] rounded-t-xl flex items-center justify-between px-2">
          <div className="flex flex-col pt-1 w-full">
            <label htmlFor="email" className="text-[#8E8E92]">
              E-mail
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-[#0E1217] rounded-xl p-3 text-white text-xl outline-none"
            />
          </div>
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_6_335)">
                <path
                  d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7Z"
                  stroke="#8E8E92"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 7L12 13L21 7"
                  stroke="#8E8E92"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_335">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex flex-col bg-[#4A4A4A] rounded-b-xl">
          <div className="bg-[#0E1217] border-2 border-[#4A4A4A] rounded-b-xl flex items-center justify-between px-2">
            <div className="flex flex-col pt-1 w-full">
              <label htmlFor="password" className="text-[#8E8E92]">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-[#0E1217] rounded-xl p-3 text-white text-xl outline-none"
              />
            </div>
            <div>
              <button type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-lock"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#8E8E92"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <link
                    xmlns=""
                    type="text/css"
                    rel="stylesheet"
                    id="dark-mode-custom-link"
                  />
                  <link
                    xmlns=""
                    type="text/css"
                    rel="stylesheet"
                    id="dark-mode-general-link"
                  />
                  <style
                    xmlns=""
                    lang="en"
                    type="text/css"
                    id="dark-mode-custom-style"
                  />
                  <style
                    xmlns=""
                    lang="en"
                    type="text/css"
                    id="dark-mode-native-style"
                  />
                  <style
                    xmlns=""
                    lang="en"
                    type="text/css"
                    id="dark-mode-native-sheet"
                  />
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                  <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                  <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                </svg>
              </button>
            </div>
          </div>
          <div className="h-20">
            <button className="w-full">
              <p className="text-[#8E8E92] text-center">
                Mot de passe oublié ?
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="pt-14">
        <button
          type="submit"
          style={{ background: "linear-gradient(140deg, #FF2E00, #FD9D58)" }}
          className="flex items-center justify-between w-full rounded-2xl h-16 px-3"
        >
          <span className="text-2xl">Connexion</span>
          <span className="bg-[#0E1217] rounded-full p-3 text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_5_232)">
                <path
                  d="M1 12L19 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 20L20 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 3L20 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_232">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
