// Shared by Ukrainian and English Trust Box pages.
// It ONLY prepares a draft in the visitor's email application.
// There is no form, network submission, or website-side storage of appeals.
const composer = document.getElementById('trustComposer');
const textarea = document.getElementById('trustMessage');
const prepareButton = document.getElementById('trustPrepareButton');

if (
  composer instanceof HTMLElement &&
  textarea instanceof HTMLTextAreaElement &&
  prepareButton instanceof HTMLButtonElement
) {
  const email = composer.dataset.email?.trim();
  const subject = composer.dataset.subject?.trim();

  if (email && subject) {
    prepareButton.addEventListener('click', () => {
      const body = encodeURIComponent(textarea.value.trim());
      const encodedSubject = encodeURIComponent(subject);
      window.location.href = `mailto:${email}?subject=${encodedSubject}&body=${body}`;
    });

    // A working handler is a prerequisite for making the JS-only button visible.
    // Without JavaScript the direct mailto link remains available instead.
    prepareButton.hidden = false;
  }
}
