import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Suspense } from "react";
import {ActivityManager} from "./examples/Activity";


function App() {
  return (
    <>
      <div>
        <Suspense
          fallback={
            <h1 className="text-2xl text-center font-bold mt-5">Loading...</h1>
          }
        >
          {/* <Users fetchPostsPromise={fetchPostsPromise} /> */}
          <ActivityManager />
          
          {/* <Theme /> */}
        </Suspense>
      </div>
    </>
  );
}

export default App;
