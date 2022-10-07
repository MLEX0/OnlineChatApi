DROP TABLE "User", "Message";
DROP TABLE "Message";

CREATE TABLE public."User"
(
    "ID" SERIAL PRIMARY KEY NOT NULL,
    "Login" CHARACTER VARYING(100) NOT NULL,
    "Password" CHARACTER VARYING(100) NOT NULL,
    "UserImage" CHARACTER VARYING(2000),
    "IsOnLine" BOOLEAN DEFAULT FALSE,
    "LastOnlineTime" TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    "IsDelete" BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public."Message"
(
    "ID" serial NOT NULL,
    "Text" character varying(300) DEFAULT NULL,
    "FilePath" character varying(2000) DEFAULT NULL,
    "IdSender" integer NOT NULL,
    "IdRecipient" integer NOT NULL,
    "IsRead" BOOLEAN DEFAULT FALSE,
    "SendTime" timestamp without time zone DEFAULT now(),
    PRIMARY KEY ("ID")
);

ALTER TABLE IF EXISTS public."Message"
    ADD FOREIGN KEY ("IdSender")
        REFERENCES public."User" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;


ALTER TABLE IF EXISTS public."Message"
    ADD FOREIGN KEY ("IdRecipient")
        REFERENCES public."User" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID;


SELECT * FROM "User";
SELECT * FROM "Message";