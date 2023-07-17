import "@styles/global.css";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";

export const metadata = {
  title: "WorkHubb",
  description: "Find Freelance Work and Jobs",
};

/**
 * Here is a list of unfinished components that need to be added to the layout
 * TODO:
 * Implement .css blocks
 * - main
 * - background
 * - app
 */

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="background"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
