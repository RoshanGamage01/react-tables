import { DefaultTable } from "./components"

export default function App() {
    return (
        <>
            <section className="p-5 h-screen">
                <DefaultTable tableDataSet={{data: [{"id": 1, "name": "test", "mail" : "mail@m.com"}]}} />
            </section>   
        </>
    )
}