import { IMAGES } from "../contants/images";

const ModuleData = [
  {
    id: "1",
    image: IMAGES.Cutting,
    leadingText: "Module 1: Cutting",
    trailingText: "Estimated Cost: $120",
    cost: 120,
    middleText: "Cutting of the Leather Jacket",
    status: "Completed",
    description:
      "This module involves the precise cutting of leather pieces required for crafting the jacket. Detailed measurements and patterns are followed to ensure accuracy and consistency in the final product.",
    assignedTo: "Azman Cutting Center",
  },
  {
    id: "2",
    image: IMAGES.Printing,
    leadingText: "Module 2: Printing",
    trailingText: "Estimated Cost: $90",
    cost: 90,
    middleText: "Printing Designs on Leather",
    status: "Ongoing",
    description:
      "In this module, various designs and patterns are printed on the leather material. Advanced printing techniques are used to achieve vibrant and long-lasting prints that enhance the aesthetic appeal of the leather jackets.",
    assignedTo: "Ali Printing House",
  },
  {
    id: "3",
    image: IMAGES.Embrodiery,
    leadingText: "Module 3: Embroidery",
    trailingText: "Estimated Cost: $60",
    cost: 65,
    middleText: "Embroidery on Leather Pieces",
    status: "Not Started",
    description:
      "This module focuses on the intricate embroidery work that adds a unique and personalized touch to the leather pieces. Skilled artisans use specialized embroidery machines to create detailed patterns and designs.",
    assignedTo: "Not Assigned",
  },
  {
    id: "4",
    image: IMAGES.Stitching,
    leadingText: "Module 4: Stitching",
    trailingText: "Estimated Cost: $75",
    cost: 75,
    middleText: "Stitching of Leather Jacket",
    status: "Completed",
    description:
      "In this module, various leather pieces are stitched together to form the jacket. Precision stitching ensures durability and a polished finish. Quality checks are performed to maintain high standards.",
    assignedTo: "Pure Stichers",
  },
  {
    id: "5",
    image: IMAGES.Packaging,
    leadingText: "Module 5: Threading & Packaging",
    trailingText: "Estimated Cost: $110",
    cost: 110,
    middleText: "Threading and Packaging of Leather Products",
    status: "Ongoing",
    description:
      "This module involves the final threading and packaging of leather products. Each item is carefully threaded to enhance its appearance and then packaged securely to ensure it reaches customers in perfect condition.",
    assignedTo: "Raza Packing House",
  },
  {
    id: "6",
    image: IMAGES.Washing,
    leadingText: "Module 6: Washing",
    trailingText: "Estimated Cost: $45",
    cost: 45,
    middleText: "Washing and Finishing Leather",
    status: "Not Started",
    description:
      "The washing module focuses on cleaning and finishing the leather products. Various washing techniques are used to remove impurities and provide a smooth finish. The leather is then conditioned to enhance its quality and longevity.",
    assignedTo: "Not Assigned",
  },
];

export default ModuleData;
