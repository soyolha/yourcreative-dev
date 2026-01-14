export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold text-slate-100">Contact</h1>
      <p className="mt-4 text-slate-400">
        Email me at{" "}
        <a className="text-slate-100 " href="mailto: olhastatkevych71@gmail.com">
         olhastatkevych71@gmail.com
        </a>
      </p>

       <form
       action="https://formspree.io/f/xnjnoojd"
       method="POST"
       className="mt-10 flex flex-col gap-6"
       >
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="bg-transparent border-b border-slate-600 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Message"
          className="bg-transparent border-b border-slate-600 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          className="mt-4 inline-flex w-fit items-center gap-2 text-slate-100 hover:text-yellow-400 transition"
        >
          Send 
         
        </button>
      </form>
    </main>
  );
}