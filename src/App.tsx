import { Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import IndexPage from "./pages";
import EntrySuccess from "./components/EntrySuccess";

export default function App() {
  console.log(`
		
TTT                                        TTT
  TTT                                   TT
   T  TTT                            TTT
    TT   TTT                      TTT
      TTT   TTT                TTT   TT
          TT   TTT            TT   TTT
            TTT  TTTT      TTT   TT
               TT   TTT  TT   TT
                TTT  TT  T  TT
                  TT  T  T TT
                  TT  T  T TT
                   T  T  T T
                      T  T
                      T  T

		We're hiring!`);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/EntrySuccess" element={<EntrySuccess />} />
      </Routes>
    </Layout>
  );
}
