import { lazy } from "@fairy-render/solid";
import { A, Route, Router } from "@solidjs/router";
import { For, Suspense, createEffect, createResource } from "solid-js";

const Subpage = lazy(() => import("./subpage.jsx"));

export default function App(props: { url?: string }) {
  return (
    <div>
      <h3>Page</h3>
      <Suspense fallback={"loading"}>
        <Router url={props.url}>
          <Route path="/" component={Index} />
          <Route path="/subpage" component={Subpage} />
          <Route path="*" component={() => <div>NotFound</div>} />
        </Router>
      </Suspense>
    </div>
  );
}

function Index() {
  const [res] = createResource(() =>
    fetch("https://dummyjson.com/products?limit=5").then((resp) => resp.json()),
  );

  createEffect(() => {
    console.log(res());
  });

  return (
    <div>
      <A href="/solid/subpage">Subpage</A>
      <div>Hello, World!: Show</div>
      <Suspense>
        <For each={res()?.products}>
          {(item) => (
            <div>
              <h5>{item.title}</h5>
            </div>
          )}
        </For>
      </Suspense>
    </div>
  );
}
