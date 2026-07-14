import prisma from "../prisma";

export async function GenerateEmployeeId () {
   const lastEmployeeId = await prisma.user.findFirst({
    where: {
        employeeId: {
            startsWith: "EMP-",
        }
    },
    orderBy: {
        employeeId: "desc",
    },
    select: {
        employeeId: true
    }
   });

   if(!lastEmployeeId){
    return "EMP-00001";
   }

   const currentEmployeeId = Number(lastEmployeeId.employeeId?.replace("EMP-", ""));

    return `EMP-${String(currentEmployeeId + 1).padStart(5, "0")}`;
}