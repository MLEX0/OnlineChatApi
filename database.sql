CREATE TABLE "User"
(
    "ID" SERIAL PRIMARY KEY NOT NULL,
    "Login" CHARACTER VARYING(100) NOT NULL,
    "Password" CHARACTER VARYING(100) NOT NULL,
    "IsOnLine" boolean DEFAULT FALSE,
    "IsDelete" boolean DEFAULT FALSE
);

SELECT * FROM "User"