/**
 * Email job processor
 * For now, just logs to console
 */
export default async function sendEmail(job) {
  const { to, subject, body } = job.data;

  console.log("📧 Processing email job:", {
    jobId: job.id,
    to,
    subject,
    body,
    timestamp: new Date().toISOString(),
  });

  // Simulate some processing time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("✅ Email job completed:", job.id);

  return { success: true, message: "Email sent (logged to console)" };
}

