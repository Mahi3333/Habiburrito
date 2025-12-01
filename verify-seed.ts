import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const menuItems = await prisma.menuItem.count()
    const modifiers = await prisma.modifier.count()
    const options = await prisma.modifierOption.count()
    const links = await prisma.itemModifierLink.count()

    console.log(`Verification Results:`)
    console.log(`MenuItems: ${menuItems}`)
    console.log(`Modifiers: ${modifiers}`)
    console.log(`ModifierOptions: ${options}`)
    console.log(`ItemModifierLinks: ${links}`)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
