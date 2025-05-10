import prisma from "../src/prisma/client"

async function main() {
  const developersCount = await prisma.developer.count();
  if (developersCount > 0) {
    console.log('Seeding developers already exists. Skipping...');
  } else {
    await prisma.developer.createMany({
      data: [
        {
          name: "Mountain View",
          image: "https://developers-eg.com/wp-content/uploads/2024/10/Mountain-View.jpg",
        },
        { 
          name: "Orascom", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm_HA4IzV7HROSrjZ5VhPDL-Ndp7fAAS0_iQ&s",
        }
      ]
    });
  }

  const projectsCount = await prisma.project.count();
  if (projectsCount > 0) {
    console.log('Seeding projects already exists. Skipping...');
  } else {
    await prisma.project.createMany({
      data: [
        { 
          name: "New Giza", 
          location: "Giza, Egypt", 
          developerId: 1,
        },
        { 
          name: "Al Alamein", 
          location: "North Coast, Egypt", 
          developerId: 2,
        }
      ]
    });
  }  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });
