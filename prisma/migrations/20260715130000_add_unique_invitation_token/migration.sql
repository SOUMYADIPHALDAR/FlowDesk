-- Ensure each activation link can identify and activate only one user.
CREATE UNIQUE INDEX "User_invitationToken_key" ON "User"("invitationToken");
