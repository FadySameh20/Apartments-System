import prisma from "../src/prisma/client"

async function main() {
  const developersCount = await prisma.developer.count();
  if (developersCount > 0) {
    console.log('Seeding developers already exists. Skipping...');
  } else {
    await prisma.developer.createMany({
      data: [
        {
          name: "Skyline Builders",
          image: "https://example.com/logos/skyline.png",
        },
        { 
          name: "Green Earth Developers", 
          image: "https://example.com/logos/greenearth.png",
        },
        { 
          name: "Oceanic Estates", 
          image: "https://example.com/logos/oceanic.png",
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
          name: "Sunset Boulevard", 
          location: "Los Angeles, CA", 
          developerId: 1,
        },
        { 
          name: "Eco Habitat", 
          location: "Portland, OR", 
          developerId: 2,
        },
        { 
          name: "Marina View Residences", 
          location: "Miami, FL", 
          developerId: 3,
        },
        { 
          name: "Urban Oasis", 
          location: "Austin, TX", 
          developerId: 1,
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
