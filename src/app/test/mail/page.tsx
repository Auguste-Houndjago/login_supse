import { sendTestEmail } from "@/lib/send-test-email";

export default function TestEmailPage() {
  async function action() {
    'use server';
    await sendTestEmail();
  }

  return (
    <form action={action}>
      <button type="submit">Envoyer l’email de test</button>

      <div>
        <pre>
            {JSON.stringify(sendTestEmail(), null, 2)}
        </pre>
      </div>
    </form>
  );
}
