// Contact forms tailored to each kind of business.
// Demo forms collect nothing: the fields have no `name`, so the browser sends no data when the form is
// submitted, and the page just jumps to a "thanks" note. Wire up a real form handler (for example Netlify
// Forms) only once the business has signed up and agreed where messages should go.

// Field shorthands. `svc` is replaced with the business's own service list.
const text = (label, opts = {}) => ({ type: "text", label, ...opts });
const date = (label, opts = {}) => ({ type: "date", label, ...opts });
const time = (label, opts = {}) => ({ type: "time", label, ...opts });
const num = (label, opts = {}) => ({ type: "number", label, min: 1, ...opts });
const select = (label, options, opts = {}) => ({ type: "select", label, options, ...opts });
const chips = (label, options, opts = {}) => ({ type: "chips", label, options, ...opts });
const svc = (label = "What do you need?") => ({ type: "select", label, options: "services" });

const URGENCY = chips("How soon?", ["Today, it's urgent", "This week", "Just getting a quote"]);
const AREA = text("Street or ZIP code", { autocomplete: "postal-code", hint: "So we know you're in our area." });
const TIME_OF_DAY = chips("Best time", ["Morning", "Afternoon", "Evening", "Any time"]);

// title: form heading. intro: one line above the form. submit: button text. message: label for the free-text box.
const FORMS = {
  // ---- trades and home services ----
  plumber: { title: "Request a plumber", intro: "Tell us what's going on and we'll call you back with a time and a price.", fields: [svc(), chips("How soon?", ["Water is leaking now", "This week", "Just getting a quote"]), AREA], message: "Describe the problem", submit: "Request a call back" },
  electrician: { title: "Request an electrician", intro: "Tell us about the job and we'll get back to you with a quote.", fields: [svc(), URGENCY, chips("Property", ["Home", "Business", "Rental"]), AREA], message: "Describe the job", submit: "Request a quote" },
  hvac: { title: "Book a heating or cooling visit", intro: "Let us know what your system is doing and when suits you.", fields: [svc(), chips("System", ["Central AC", "Furnace", "Heat pump", "Not sure"]), URGENCY, AREA], message: "What's it doing (or not doing)?", submit: "Book a visit" },
  roofer: { title: "Get a roof quote", intro: "A few details help us plan an inspection.", fields: [svc(), chips("Is anything leaking right now?", ["Yes", "No", "Not sure"]), select("Roof type", ["Shingle", "Metal", "Tile", "Flat", "Not sure"]), AREA], message: "Anything else we should know?", submit: "Request an inspection" },
  contractor: { title: "Tell us about your project", intro: "Share the basics and we'll arrange a time to talk it through.", fields: [svc("Project type"), select("Rough budget", ["Under $5k", "$5k–$20k", "$20k–$50k", "$50k+", "Not sure yet"]), select("When would you like to start?", ["As soon as possible", "In 1–3 months", "In 3–6 months", "Just planning"]), AREA], message: "Describe the project", submit: "Request a quote" },
  auto: { title: "Book your car in", intro: "Tell us about your vehicle and we'll confirm a drop-off time.", fields: [text("Vehicle", { placeholder: "Year, make and model", required: true }), svc("What does it need?"), date("Preferred drop-off day")], message: "Warning lights, noises, anything we should know", submit: "Request a booking" },
  cleaning: { title: "Get a cleaning quote", intro: "A few details and we'll send you a price.", fields: [svc("Type of clean"), select("Size", ["Studio or 1 bedroom", "2 bedrooms", "3 bedrooms", "4+ bedrooms", "Office"]), chips("How often?", ["One time", "Weekly", "Every 2 weeks", "Monthly"]), AREA], message: "Pets, access, or anything to know", submit: "Get my quote" },
  landscaping: { title: "Get a free estimate", intro: "Tell us about your yard and what you'd like done.", fields: [svc(), chips("How often?", ["One time", "Weekly", "Every 2 weeks", "Seasonal"]), AREA], message: "Describe your yard and ideas", submit: "Request an estimate" },
  locksmith: { title: "Get help from a locksmith", intro: "Locked out right now? Calling is fastest. For anything else, send us the details.", fields: [chips("What's happening?", ["Locked out", "Need locks changed", "New keys", "Something else"]), chips("Where?", ["Home", "Car", "Business"]), AREA], message: "Any details", submit: "Send request" },
  moving: { title: "Get a moving quote", intro: "Where, when and how much: that's all we need to price your move.", fields: [text("Moving from", { placeholder: "City or ZIP", required: true }), text("Moving to", { placeholder: "City or ZIP", required: true }), date("Move date"), select("Home size", ["Studio", "1 bedroom", "2 bedrooms", "3 bedrooms", "4+ bedrooms", "Office"]), chips("Packing help?", ["Yes, pack for me", "Just the heavy lifting"])], message: "Large or fragile items (piano, safe, art)", submit: "Get my quote" },
  painter: { title: "Get a painting quote", intro: "Tell us what you'd like painted and we'll arrange a visit.", fields: [chips("Where?", ["Interior", "Exterior", "Both", "Cabinets"]), select("Size of the job", ["One room", "A few rooms", "Whole home", "Commercial space"]), AREA], message: "Colors, condition of the walls, timing", submit: "Request a quote" },

  // ---- food, wellness, family ----
  bakery: { title: "Order ahead", intro: "Cakes, big orders and trays: tell us what you'd like and when.", fields: [select("What would you like?", ["Celebration cake", "Bread & pastries", "Catering tray", "Something else"], { required: true }), date("Pickup date", { required: true }), num("How many people?", { placeholder: "e.g. 12" }), text("Allergies or dietary needs", { placeholder: "Nut-free, vegan, gluten-free…" })], message: "Flavors, decorations or message on the cake", submit: "Send my order request" },
  cafe: { title: "Get in touch", intro: "Group bookings, catering or a question: we'd love to hear from you.", fields: [chips("What's it about?", ["Catering order", "Group booking", "General question"]), date("Date"), num("How many people?")], message: "Your message", submit: "Send message" },
  florist: { title: "Order flowers", intro: "Tell us who they're for and we'll take care of the rest.", fields: [select("Occasion", ["Birthday", "Anniversary", "Sympathy", "Wedding", "Get well", "Just because"], { required: true }), chips("Delivery or pickup?", ["Delivery", "Pickup"]), date("When do you need them?", { required: true }), select("Budget", ["Under $50", "$50–$100", "$100–$200", "$200+"])], message: "Card message, colors or favorite flowers", submit: "Send my order request" },
  yoga: { title: "Book your first class", intro: "Tell us a little about you and we'll suggest the right class.", fields: [svc("Which class interests you?"), chips("Your experience", ["New to yoga", "Some experience", "Regular practice"]), chips("Best time", ["Mornings", "Lunchtime", "Evenings", "Weekends"])], message: "Injuries or anything the teacher should know", submit: "Request a spot" },
  spa: { title: "Book a treatment", intro: "Choose a treatment and a time and we'll confirm your booking.", fields: [svc("Treatment"), date("Preferred date"), TIME_OF_DAY, chips("First visit?", ["Yes", "No"])], message: "Anything we should know (pressure, sensitivities)", submit: "Request a booking" },
  cooking: { title: "Book a class", intro: "Tell us who's cooking and what you'd like to make, and we'll find the right class, camp or party.", fields: [select("What are you booking?", ["Kids class", "Summer camp", "Adult class", "Birthday party", "Team or group event"], { required: true }), num("How many people?", { placeholder: "e.g. 2" }), date("Preferred date"), text("Allergies or dietary needs", { placeholder: "Nut-free, gluten-free, vegetarian…" })], message: "Anything else we should know", submit: "Send my booking request" },
  school: { title: "Book a class", intro: "Tell us who's learning and what interests them, and we'll suggest a class or camp.", fields: [select("Who is it for?", ["My child", "Myself", "A group or party", "A gift"], { required: true }), select("Age group", ["Under 6", "6–9", "10–13", "Teens", "Adult"]), chips("Interested in", ["Weekly classes", "Camps", "Private lesson", "Party or event"]), date("Preferred start date")], message: "Anything we should know (experience, allergies, questions)", submit: "Send my class request" },
  daycare: { title: "Arrange a visit", intro: "Come and see the rooms and meet the team. Tell us about your child.", nameLabel: "Parent or guardian name", fields: [select("Child's age", ["Under 1", "1–2 years", "3–5 years"], { required: true }), date("Ideal start date"), chips("Days needed", ["Full week", "Part week", "Not sure yet"])], message: "Questions for us", submit: "Arrange a visit" },
  pet: { title: "Book an appointment", intro: "Tell us about your pet and we'll find a time.", fields: [text("Pet's name", { required: true }), chips("Size", ["Small (under 20 lb)", "Medium", "Large (50 lb+)", "Cat"]), text("Breed", { placeholder: "e.g. Poodle mix" }), svc("Service"), date("Preferred date")], message: "Temperament, matting, or anything to know", submit: "Request an appointment" },

  // ---- makers, street and DIY ----
  foodtruck: { title: "Book the truck", intro: "Weddings, office lunches, parties: tell us about your event.", fields: [select("Event type", ["Wedding", "Office lunch", "Birthday", "Festival or market", "Something else"]), date("Event date", { required: true }), num("Guests", { placeholder: "e.g. 80", required: true }), text("Event location", { placeholder: "Area or ZIP" })], message: "Menu ideas or dietary needs", submit: "Check availability" },
  print: { title: "Get a print quote", intro: "Tell us what you need printed and by when.", fields: [svc("Product"), num("Quantity", { placeholder: "e.g. 250", required: true }), date("Needed by"), chips("Artwork", ["I have print-ready files", "I need design help"])], message: "Sizes, colors, materials", submit: "Get my quote" },
  bikes: { title: "Book a tune-up or repair", intro: "Tell us about your bike and we'll give you a drop-off time.", fields: [svc("What does it need?"), select("Bike type", ["Road", "Mountain", "Hybrid / commuter", "E-bike", "Kids", "Skateboard / other"]), date("Preferred drop-off day")], message: "What's it doing?", submit: "Request a booking" },

  // ---- nightlife, games, collectors ----
  nightlife: { title: "Plan your night", intro: "Birthdays, work nights and big groups: book ahead and we'll be ready.", fields: [select("Occasion", ["Birthday", "Work night", "Bachelor / bachelorette", "Private event", "Just for fun"]), date("Date", { required: true }), num("Group size", { required: true })], message: "Anything special?", submit: "Request a booking" },
  records: { title: "Looking for something? Selling?", intro: "Tell us what you're after, or what you'd like to sell.", fields: [chips("I want to", ["Find something", "Sell or trade", "Ask a question"], { required: true })], message: "Titles, artists, condition, quantity", submit: "Send message" },

  // ---- high-end retail and stays ----
  jeweler: { title: "Book a private viewing", intro: "Unhurried time with us, by appointment.", fields: [svc("I'm interested in"), date("Preferred date"), TIME_OF_DAY, select("Budget (optional)", ["Prefer not to say", "Under $1,000", "$1,000–$5,000", "$5,000+"])], message: "Tell us what you have in mind", submit: "Request an appointment" },
  hotel: { title: "Check availability", intro: "Send us your dates and we'll reply with availability and rates.", fields: [date("Check-in", { required: true }), date("Check-out", { required: true }), num("Guests", { required: true, placeholder: "2" }), num("Rooms", { placeholder: "1" })], message: "Special requests", submit: "Check availability" },

  // ---- design and advisory ----
  architect: { title: "Start a project", intro: "Tell us about the space and what you'd like it to become.", fields: [svc("Project type"), text("Project location", { placeholder: "Neighborhood or ZIP" }), select("Budget range", ["Under $100k", "$100k–$500k", "$500k+", "Not sure yet"]), select("Timing", ["Ready to start", "In the next 6 months", "Exploring ideas"])], message: "Describe the project", submit: "Start the conversation" },

  // ---- craft, vintage, hospitality ----
  barber: { title: "Book a chair", intro: "Pick a service and a time and we'll hold the chair for you.", fields: [svc("Service"), date("Preferred day"), time("Preferred time")], message: "Anything else?", submit: "Request a booking" },
  tattoo: { title: "Book a consult", intro: "Tell us about your idea. Rough is fine: we'll design it with you.", fields: [text("Placement", { placeholder: "Forearm, back, ankle…", required: true }), chips("Size", ["Small (palm-size)", "Medium", "Large / sleeve"]), chips("Style", ["Black & grey", "Color", "Not sure"]), date("Preferred consult date")], message: "Describe your idea", submit: "Request a consult" },
  restaurant: { title: "Book a table", intro: "Send your request and we'll confirm by phone or email.", fields: [date("Date", { required: true }), time("Time", { required: true }), num("Guests", { required: true, placeholder: "2" }), select("Occasion (optional)", ["None", "Birthday", "Anniversary", "Business", "Celebration"])], message: "Allergies or seating requests", submit: "Request a table" },
  bar: { title: "Plan your visit", intro: "Booking a table or the whole place? Let us know.", fields: [chips("What's it for?", ["Reserve a table", "Private event", "General question"], { required: true }), date("Date"), num("Group size")], message: "Your message", submit: "Send request" },

  // ---- professional and personal services ----
  salon: { title: "Book an appointment", intro: "Choose a service and a time and we'll confirm your booking.", fields: [svc("Service"), date("Preferred date"), TIME_OF_DAY, chips("New client?", ["Yes", "No"])], message: "Inspiration, hair history or anything to know", submit: "Request an appointment" },
  health: { title: "Request an appointment", intro: "Send a request and the front desk will call you to confirm.", fields: [chips("Reason for visit", ["New patient", "Check-up", "Specific concern", "Insurance question"], { required: true }), chips("Are you a new patient?", ["Yes", "No"]), chips("Best day", ["Weekday", "Weekend", "Any day"]), TIME_OF_DAY], message: "Anything we should know to schedule you", messageHint: "Please don't include medical details here. We'll talk them through with you directly.", submit: "Request an appointment" },
  professional: { title: "Book a consultation", intro: "Tell us a little about what you need. We'll reply to arrange a time.", fields: [svc("Topic"), chips("You are", ["An individual", "A business"]), chips("Best way to reach you", ["Phone", "Email"])], message: "Briefly, how can we help?", messageHint: "Please don't include account numbers or other sensitive details.", submit: "Request a consultation" },
  realestate: { title: "Talk to an agent", intro: "Buying, selling or renting: tell us where you're at.", fields: [chips("I'm looking to", ["Buy", "Sell", "Rent", "Get a valuation"], { required: true }), text("Area or neighborhood"), select("Timeline", ["As soon as possible", "1–3 months", "3–6 months", "Just looking"]), select("Price range", ["Under $300k", "$300k–$600k", "$600k–$1M", "$1M+", "Not sure"])], message: "Anything else?", submit: "Talk to an agent" },
  photographer: { title: "Check availability", intro: "Tell us about the shoot and we'll get back to you with dates and pricing.", fields: [svc("Type of shoot"), date("Date", { required: true }), text("Location", { placeholder: "Venue, park, studio…" }), num("People in the photos")], message: "Tell us about the day", submit: "Check availability" },

  // ---- movement, energy, events ----
  gym: { title: "Start training", intro: "Tell us your goal and we'll help you find the right start.", fields: [chips("Your goal", ["Get stronger", "Lose weight", "Learn a sport", "Just get moving"]), svc("Interested in"), chips("Experience", ["Beginner", "Some", "Experienced"])], message: "Injuries or questions", submit: "Get started" },
  dance: { title: "Book a class", intro: "Tell us who's dancing and we'll suggest a class.", fields: [chips("Who's dancing?", ["Child", "Teen", "Adult"], { required: true }), svc("Style"), chips("Experience", ["Total beginner", "Some", "Experienced"])], message: "Questions for us", submit: "Request a class" },
  venue: { title: "Check dates", intro: "Tell us about your event and we'll send availability and pricing.", fields: [select("Event type", ["Wedding", "Birthday", "Corporate event", "Other celebration"], { required: true }), date("Event date", { required: true }), num("Guests", { required: true, placeholder: "e.g. 120" }), chips("Catering needed?", ["Yes", "No", "Not sure"])], message: "Tell us about the event", submit: "Check availability" },

  // ---- devices and smart tech ----
  repair: { title: "Get a repair quote", intro: "Tell us the device and the problem. We'll reply with a price.", fields: [chips("Device", ["Phone", "Tablet", "Laptop", "Desktop", "Other"], { required: true }), text("Make and model", { placeholder: "e.g. iPhone 14", required: true }), svc("What's wrong?")], message: "Describe the problem", submit: "Get my quote" },
  smarthome: { title: "Book a consultation", intro: "Tell us what you'd like to set up and we'll plan it with you.", fields: [svc("Project"), chips("Property", ["House", "Apartment", "Business"]), AREA], message: "Describe what you have in mind", submit: "Book a consultation" },
};

const DEFAULT_FORM = { title: "Get in touch", intro: "Send us a message and we'll get back to you.", fields: [svc("What can we help with?")], message: "Your message", submit: "Send message" };

// Resolves the form for one business: fills in its own services and picks a contact field order.
export function contactForm(profileKey, services = [], country = {}) {
  const spec = FORMS[profileKey] || DEFAULT_FORM;
  const fields = spec.fields.map((f) =>
    f.options === "services" ? { ...f, options: [...services.map((s) => s.title), "Something else"] }
    : f === AREA && country.postalLabel ? { ...f, label: country.postalLabel }
    : f);
  return { ...spec, fields };
}
