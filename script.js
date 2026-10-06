const providers = [
  {
    name: "Jordan Miles",
    focus: ["anxiety", "life"],
    format: ["online"],
    priorities: ["warm"],
    description: "Jordan’s collaborative style may be a good place to explore anxiety, stress, or a life change."
  },
  {
    name: "Amara Kim",
    focus: ["relationships", "anxiety"],
    format: ["person"],
    priorities: ["relationships"],
    description: "Amara’s compassionate approach may fit if relationships, stress, or finding more balance is on your mind."
  },
  {
    name: "Riley Chen",
    focus: ["mood", "life"],
    format: ["online"],
    priorities: ["affirming"],
    description: "Riley’s affirming approach may be a fit if you’re navigating low mood, identity, or a tougher season."
  }
];

const form = document.querySelector("#match-form");
const result = document.querySelector("#match-result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const answers = new FormData(form);
  const focus = answers.get("focus");
  const format = answers.get("format");
  const priority = answers.get("priority");

  const suggested = providers
    .map((provider) => {
      const score =
        Number(provider.focus.includes(focus)) +
        Number(format === "either" || provider.format.includes(format)) +
        Number(priority === "any" || provider.priorities.includes(priority));
      return { provider, score };
    })
    .sort((first, second) => second.score - first.score)[0].provider;

  result.innerHTML = `<strong>A profile to explore: ${suggested.name}</strong><p>${suggested.description} This is only a starting point; a conversation is the best way to see if it feels right.</p><a href="#providers">Explore sample provider profiles</a>`;
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});
