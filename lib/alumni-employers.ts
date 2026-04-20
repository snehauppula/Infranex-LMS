/** Employer logos shown in the home “Celebrating success of our alumni” marquee. */

export type AlumniEmployerLogo = {
  name: string;
  src: string;
};

export const ALUMNI_EMPLOYER_LOGOS: readonly AlumniEmployerLogo[] = [
  { name: "Deloitte", src: "/alumni-logos/deloitte.png" },
  { name: "Amazon", src: "/alumni-logos/amazon.png" },
  { name: "Unity", src: "/alumni-logos/unity.png" },
  { name: "Microsoft", src: "/alumni-logos/microsoft.png" },
  { name: "Meta", src: "/alumni-logos/meta.png" },
  { name: "Accenture", src: "/alumni-logos/accenture.png" },
  { name: "Cisco", src: "/alumni-logos/cisco.png" },
  { name: "Infosys", src: "/alumni-logos/infosys.png" },
  { name: "Adobe", src: "/alumni-logos/adobe.png" },
  { name: "IBM", src: "/alumni-logos/ibm.png" },
  { name: "Capgemini", src: "/alumni-logos/capgemini.png" },
  { name: "Tata Consultancy Services", src: "/alumni-logos/tcs.png" },
  { name: "Wipro", src: "/alumni-logos/wipro.png" },
];
