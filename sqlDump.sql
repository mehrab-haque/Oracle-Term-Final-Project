/*
 Navicat Premium Data Transfer

 Source Server         : VM
 Source Server Type    : Oracle
 Source Server Version : 120200
 Source Host           : 103.94.135.201:1521
 Source Schema         : TFUSER24

 Target Server Type    : Oracle
 Target Server Version : 120200
 File Encoding         : 65001

 Date: 24/02/2022 18:30:21
*/


-- ----------------------------
-- Table structure for DELETED_MESSAGES
-- ----------------------------
DROP TABLE "TFUSER24"."DELETED_MESSAGES";
CREATE TABLE "TFUSER24"."DELETED_MESSAGES" (
  "ID" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "MSG" VARCHAR2(2048 BYTE) VISIBLE NOT NULL,
  "PLACE_ID" NUMBER VISIBLE NOT NULL,
  "TILL" NUMBER(11,0) VISIBLE,
  "SCHEDULE" NUMBER(11,0) VISIBLE,
  "IS_DELETED" NUMBER(1,0) VISIBLE NOT NULL,
  "PASS" VARCHAR2(1012 BYTE) VISIBLE,
  "IS_FORWARDED" NUMBER(1,0) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for FROMS
-- ----------------------------
DROP TABLE "TFUSER24"."FROMS";
CREATE TABLE "TFUSER24"."FROMS" (
  "USER_ID" NUMBER VISIBLE NOT NULL,
  "SENDER_ID" NUMBER VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for GROUPS
-- ----------------------------
DROP TABLE "TFUSER24"."GROUPS";
CREATE TABLE "TFUSER24"."GROUPS" (
  "ID" NUMBER VISIBLE NOT NULL,
  "NAME" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "IMAGE" VARCHAR2(1000 BYTE) VISIBLE,
  "TIMESTAMP" NUMBER(11,0) VISIBLE NOT NULL,
  "CREATED_BY" NUMBER VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for HIDDEN
-- ----------------------------
DROP TABLE "TFUSER24"."HIDDEN";
CREATE TABLE "TFUSER24"."HIDDEN" (
  "USER_ID" NUMBER VISIBLE NOT NULL,
  "PLACE_ID" NUMBER VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for INBOXES
-- ----------------------------
DROP TABLE "TFUSER24"."INBOXES";
CREATE TABLE "TFUSER24"."INBOXES" (
  "ID" NUMBER VISIBLE NOT NULL,
  "UID_1" NUMBER VISIBLE NOT NULL,
  "UID_2" NUMBER VISIBLE NOT NULL,
  "TIMESTAMP" NUMBER(13,0) VISIBLE NOT NULL,
  "CREATED_BY" NUMBER VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for MEMBERS
-- ----------------------------
DROP TABLE "TFUSER24"."MEMBERS";
CREATE TABLE "TFUSER24"."MEMBERS" (
  "USER_ID" NUMBER VISIBLE NOT NULL,
  "GROUP_ID" NUMBER VISIBLE NOT NULL,
  "TIMESTAMP" NUMBER(11,0) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for MESSAGES
-- ----------------------------
DROP TABLE "TFUSER24"."MESSAGES";
CREATE TABLE "TFUSER24"."MESSAGES" (
  "ID" NUMBER VISIBLE DEFAULT "TFUSER24"."ISEQ$$_79318".nextval NOT NULL,
  "MSG" VARCHAR2(2048 BYTE) VISIBLE NOT NULL,
  "PLACE_ID" NUMBER VISIBLE NOT NULL,
  "TILL" NUMBER(11,0) VISIBLE,
  "SCHEDULE" NUMBER(11,0) VISIBLE,
  "IS_DELETED" NUMBER(1,0) VISIBLE NOT NULL,
  "PASS" VARCHAR2(1012 BYTE) VISIBLE,
  "IS_FORWARDED" NUMBER(1,0) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for PLACES
-- ----------------------------
DROP TABLE "TFUSER24"."PLACES";
CREATE TABLE "TFUSER24"."PLACES" (
  "ID" NUMBER VISIBLE DEFAULT "TFUSER24"."ISEQ$$_79298".nextval NOT NULL,
  "TYPE" NUMBER VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for REACTIONS
-- ----------------------------
DROP TABLE "TFUSER24"."REACTIONS";
CREATE TABLE "TFUSER24"."REACTIONS" (
  "ID" NUMBER VISIBLE DEFAULT "TFUSER24"."ISEQ$$_79329".nextval NOT NULL,
  "LABEL" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "IMAGE" VARCHAR2(1000 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for REACTS
-- ----------------------------
DROP TABLE "TFUSER24"."REACTS";
CREATE TABLE "TFUSER24"."REACTS" (
  "MESSAGE_ID" NUMBER VISIBLE NOT NULL,
  "USER_ID" NUMBER VISIBLE NOT NULL,
  "REACTION_ID" NUMBER VISIBLE NOT NULL,
  "TIMESTAMP" NUMBER(11,0) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for RECEIVERS
-- ----------------------------
DROP TABLE "TFUSER24"."RECEIVERS";
CREATE TABLE "TFUSER24"."RECEIVERS" (
  "ID" NUMBER VISIBLE DEFAULT "TFUSER24"."ISEQ$$_79313".nextval NOT NULL,
  "TYPE" VARCHAR2(100 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for REMOVEDMEMBERS
-- ----------------------------
DROP TABLE "TFUSER24"."REMOVEDMEMBERS";
CREATE TABLE "TFUSER24"."REMOVEDMEMBERS" (
  "USER_ID" VARCHAR2(100 BYTE) VISIBLE,
  "GROUP_ID" VARCHAR2(100 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for REPLIES
-- ----------------------------
DROP TABLE "TFUSER24"."REPLIES";
CREATE TABLE "TFUSER24"."REPLIES" (
  "MSG_ID_1" NUMBER VISIBLE NOT NULL,
  "MSG_ID_2" NUMBER VISIBLE NOT NULL,
  "TIMESTAMP" NUMBER(11,0) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for SEEN
-- ----------------------------
DROP TABLE "TFUSER24"."SEEN";
CREATE TABLE "TFUSER24"."SEEN" (
  "USER_ID" NUMBER VISIBLE NOT NULL,
  "MESSAGE_ID" NUMBER VISIBLE NOT NULL,
  "TIMESTAMP" NUMBER(13,0) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for SENDERS
-- ----------------------------
DROP TABLE "TFUSER24"."SENDERS";
CREATE TABLE "TFUSER24"."SENDERS" (
  "ID" NUMBER VISIBLE DEFAULT "TFUSER24"."ISEQ$$_79308".nextval NOT NULL,
  "TYPE" VARCHAR2(100 BYTE) VISIBLE
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for SENDERS_RECEIVERS
-- ----------------------------
DROP TABLE "TFUSER24"."SENDERS_RECEIVERS";
CREATE TABLE "TFUSER24"."SENDERS_RECEIVERS" (
  "MESSAGE_ID" NUMBER VISIBLE NOT NULL,
  "SENDER_ID" NUMBER VISIBLE NOT NULL,
  "RECEIVER_ID" NUMBER VISIBLE NOT NULL,
  "TIMESTAMP" NUMBER(13,0) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for TOS
-- ----------------------------
DROP TABLE "TFUSER24"."TOS";
CREATE TABLE "TFUSER24"."TOS" (
  "USER_ID" NUMBER VISIBLE NOT NULL,
  "RECEIVER_ID" NUMBER VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Table structure for USERS
-- ----------------------------
DROP TABLE "TFUSER24"."USERS";
CREATE TABLE "TFUSER24"."USERS" (
  "ID" NUMBER VISIBLE DEFAULT "TFUSER24"."ISEQ$$_79295".nextval NOT NULL,
  "NAME" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "IMAGE" VARCHAR2(1000 BYTE) VISIBLE,
  "STATUS" VARCHAR2(25 BYTE) VISIBLE,
  "LOGIN" VARCHAR2(100 BYTE) VISIBLE NOT NULL,
  "PASS" VARCHAR2(1024 BYTE) VISIBLE NOT NULL
)
LOGGING
NOCOMPRESS
PCTFREE 10
INITRANS 1
STORAGE (
  INITIAL 65536 
  NEXT 1048576 
  MINEXTENTS 1
  MAXEXTENTS 2147483645
  BUFFER_POOL DEFAULT
)
PARALLEL 1
NOCACHE
DISABLE ROW MOVEMENT
;

-- ----------------------------
-- Function structure for DELETEMESSAGE
-- ----------------------------
CREATE OR REPLACE
PROCEDURE "TFUSER24"."DELETEMESSAGE" AS
begin
select count(*) into seenCount from seen where MESSAGE_ID=msgId;
if(seenCount>0) then
delete from seen where MESSAGE_ID=msgId;
end if;
select count(*) into replyCount from replies where  msg_id_1=msgId or msg_id_2=msgId ;
if(replyCount>0) then
delete from replies where msg_id_1=msgId or msg_id_2=msgId;
end if;
select count(*) into reactCount from reacts where MESSAGE_ID=msgId;
if(reactCount>0) then
delete from reacts where MESSAGE_ID=msgId;
end if;
select count(*) into s_rCount from senders_receivers where MESSAGE_ID=msgId;
if(s_rCount>0) then
delete from SENDERS_RECEIVERS where MESSAGE_ID=msgId;
end if;
DELETE from MESSAGES where id=msgId;




end;
/

-- ----------------------------
-- Sequence structure for ISEQ$$_79295
-- ----------------------------
DROP SEQUENCE "TFUSER24"."ISEQ$$_79295";
CREATE SEQUENCE "TFUSER24"."ISEQ$$_79295" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_79298
-- ----------------------------
DROP SEQUENCE "TFUSER24"."ISEQ$$_79298";
CREATE SEQUENCE "TFUSER24"."ISEQ$$_79298" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_79308
-- ----------------------------
DROP SEQUENCE "TFUSER24"."ISEQ$$_79308";
CREATE SEQUENCE "TFUSER24"."ISEQ$$_79308" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_79313
-- ----------------------------
DROP SEQUENCE "TFUSER24"."ISEQ$$_79313";
CREATE SEQUENCE "TFUSER24"."ISEQ$$_79313" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_79318
-- ----------------------------
DROP SEQUENCE "TFUSER24"."ISEQ$$_79318";
CREATE SEQUENCE "TFUSER24"."ISEQ$$_79318" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Sequence structure for ISEQ$$_79329
-- ----------------------------
DROP SEQUENCE "TFUSER24"."ISEQ$$_79329";
CREATE SEQUENCE "TFUSER24"."ISEQ$$_79329" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 CACHE 20;

-- ----------------------------
-- Primary Key structure for table DELETED_MESSAGES
-- ----------------------------
ALTER TABLE "TFUSER24"."DELETED_MESSAGES" ADD CONSTRAINT "SYS_C0025693" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table DELETED_MESSAGES
-- ----------------------------
ALTER TABLE "TFUSER24"."DELETED_MESSAGES" ADD CONSTRAINT "SYS_C0025689" CHECK ("MSG" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."DELETED_MESSAGES" ADD CONSTRAINT "SYS_C0025690" CHECK ("PLACE_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."DELETED_MESSAGES" ADD CONSTRAINT "SYS_C0025691" CHECK ("IS_DELETED" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."DELETED_MESSAGES" ADD CONSTRAINT "SYS_C0025692" CHECK ("IS_FORWARDED" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table FROMS
-- ----------------------------
ALTER TABLE "TFUSER24"."FROMS" ADD CONSTRAINT "SYS_C0011805" PRIMARY KEY ("USER_ID", "SENDER_ID");

-- ----------------------------
-- Checks structure for table FROMS
-- ----------------------------
ALTER TABLE "TFUSER24"."FROMS" ADD CONSTRAINT "SYS_C0011803" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."FROMS" ADD CONSTRAINT "SYS_C0011804" CHECK ("SENDER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table GROUPS
-- ----------------------------
ALTER TABLE "TFUSER24"."GROUPS" ADD CONSTRAINT "SYS_C0011782" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table GROUPS
-- ----------------------------
ALTER TABLE "TFUSER24"."GROUPS" ADD CONSTRAINT "SYS_C0011778" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."GROUPS" ADD CONSTRAINT "SYS_C0011779" CHECK ("NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."GROUPS" ADD CONSTRAINT "SYS_C0011780" CHECK ("TIMESTAMP" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."GROUPS" ADD CONSTRAINT "SYS_C0011781" CHECK ("CREATED_BY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table HIDDEN
-- ----------------------------
ALTER TABLE "TFUSER24"."HIDDEN" ADD CONSTRAINT "SYS_C0011838" PRIMARY KEY ("USER_ID", "PLACE_ID");

-- ----------------------------
-- Checks structure for table HIDDEN
-- ----------------------------
ALTER TABLE "TFUSER24"."HIDDEN" ADD CONSTRAINT "SYS_C0011836" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."HIDDEN" ADD CONSTRAINT "SYS_C0011837" CHECK ("PLACE_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table INBOXES
-- ----------------------------
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "SYS_C0021004" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table INBOXES
-- ----------------------------
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "INBOX_UID_CONSTRAINT" CHECK (uid_1<uid_2) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "SYS_C0020999" CHECK ("UID_1" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "SYS_C0021000" CHECK ("UID_2" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "SYS_C0021001" CHECK ("TIMESTAMP" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "SYS_C0021002" CHECK ("CREATED_BY" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table MEMBERS
-- ----------------------------
ALTER TABLE "TFUSER24"."MEMBERS" ADD CONSTRAINT "SYS_C0011798" PRIMARY KEY ("USER_ID", "GROUP_ID");

-- ----------------------------
-- Checks structure for table MEMBERS
-- ----------------------------
ALTER TABLE "TFUSER24"."MEMBERS" ADD CONSTRAINT "SYS_C0011795" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."MEMBERS" ADD CONSTRAINT "SYS_C0011796" CHECK ("GROUP_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."MEMBERS" ADD CONSTRAINT "SYS_C0011797" CHECK ("TIMESTAMP" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table MEMBERS
-- ----------------------------
CREATE TRIGGER "TFUSER24"."REMOVEDMEMBERS" BEFORE DELETE ON "TFUSER24"."MEMBERS" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
declare
begin

insert into removedMembers values(:old.user_id,:old.GROUP_ID);

end;
/

-- ----------------------------
-- Primary Key structure for table MESSAGES
-- ----------------------------
ALTER TABLE "TFUSER24"."MESSAGES" ADD CONSTRAINT "SYS_C0011820" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table MESSAGES
-- ----------------------------
ALTER TABLE "TFUSER24"."MESSAGES" ADD CONSTRAINT "SYS_C0011815" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."MESSAGES" ADD CONSTRAINT "SYS_C0011816" CHECK ("MSG" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."MESSAGES" ADD CONSTRAINT "SYS_C0011817" CHECK ("PLACE_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."MESSAGES" ADD CONSTRAINT "SYS_C0011818" CHECK ("IS_DELETED" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."MESSAGES" ADD CONSTRAINT "SYS_C0011819" CHECK ("IS_FORWARDED" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Triggers structure for table MESSAGES
-- ----------------------------
CREATE TRIGGER "TFUSER24"."DELETEDMESSAGES" BEFORE DELETE ON "TFUSER24"."MESSAGES" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
declare

begin
INSERT INTO DELETED_MESSAGES values(:old.ID,:old.MSG,:old.PLACE_ID,:old.TILL,:old.SCHEDULE,:old.IS_DELETED,:old.pass,:old.IS_FORWARDED);
end;
/

-- ----------------------------
-- Primary Key structure for table PLACES
-- ----------------------------
ALTER TABLE "TFUSER24"."PLACES" ADD CONSTRAINT "SYS_C0011777" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table PLACES
-- ----------------------------
ALTER TABLE "TFUSER24"."PLACES" ADD CONSTRAINT "SYS_C0011775" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."PLACES" ADD CONSTRAINT "SYS_C0011776" CHECK ("TYPE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table REACTIONS
-- ----------------------------
ALTER TABLE "TFUSER24"."REACTIONS" ADD CONSTRAINT "SYS_C0011850" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table REACTIONS
-- ----------------------------
ALTER TABLE "TFUSER24"."REACTIONS" ADD CONSTRAINT "SYS_C0011847" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REACTIONS" ADD CONSTRAINT "SYS_C0011848" CHECK ("LABEL" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REACTIONS" ADD CONSTRAINT "SYS_C0011849" CHECK ("IMAGE" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table REACTS
-- ----------------------------
ALTER TABLE "TFUSER24"."REACTS" ADD CONSTRAINT "SYS_C0011855" PRIMARY KEY ("MESSAGE_ID", "USER_ID", "REACTION_ID");

-- ----------------------------
-- Checks structure for table REACTS
-- ----------------------------
ALTER TABLE "TFUSER24"."REACTS" ADD CONSTRAINT "SYS_C0011851" CHECK ("MESSAGE_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REACTS" ADD CONSTRAINT "SYS_C0011852" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REACTS" ADD CONSTRAINT "SYS_C0011853" CHECK ("REACTION_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REACTS" ADD CONSTRAINT "SYS_C0011854" CHECK ("TIMESTAMP" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table RECEIVERS
-- ----------------------------
ALTER TABLE "TFUSER24"."RECEIVERS" ADD CONSTRAINT "SYS_C0011809" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table RECEIVERS
-- ----------------------------
ALTER TABLE "TFUSER24"."RECEIVERS" ADD CONSTRAINT "SYS_C0011808" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table REPLIES
-- ----------------------------
ALTER TABLE "TFUSER24"."REPLIES" ADD CONSTRAINT "SYS_C0011825" PRIMARY KEY ("MSG_ID_1", "MSG_ID_2");

-- ----------------------------
-- Checks structure for table REPLIES
-- ----------------------------
ALTER TABLE "TFUSER24"."REPLIES" ADD CONSTRAINT "SYS_C0011822" CHECK ("MSG_ID_1" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REPLIES" ADD CONSTRAINT "SYS_C0011823" CHECK ("MSG_ID_2" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REPLIES" ADD CONSTRAINT "SYS_C0011824" CHECK ("TIMESTAMP" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table SEEN
-- ----------------------------
ALTER TABLE "TFUSER24"."SEEN" ADD CONSTRAINT "SYS_C0011844" PRIMARY KEY ("USER_ID", "MESSAGE_ID");

-- ----------------------------
-- Checks structure for table SEEN
-- ----------------------------
ALTER TABLE "TFUSER24"."SEEN" ADD CONSTRAINT "SYS_C0011841" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."SEEN" ADD CONSTRAINT "SYS_C0011842" CHECK ("MESSAGE_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."SEEN" ADD CONSTRAINT "SYS_C0011843" CHECK ("TIMESTAMP" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table SENDERS
-- ----------------------------
ALTER TABLE "TFUSER24"."SENDERS" ADD CONSTRAINT "SYS_C0011802" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table SENDERS
-- ----------------------------
ALTER TABLE "TFUSER24"."SENDERS" ADD CONSTRAINT "SYS_C0011801" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table SENDERS_RECEIVERS
-- ----------------------------
ALTER TABLE "TFUSER24"."SENDERS_RECEIVERS" ADD CONSTRAINT "SYS_C0011832" PRIMARY KEY ("MESSAGE_ID", "SENDER_ID", "RECEIVER_ID");

-- ----------------------------
-- Checks structure for table SENDERS_RECEIVERS
-- ----------------------------
ALTER TABLE "TFUSER24"."SENDERS_RECEIVERS" ADD CONSTRAINT "SYS_C0011828" CHECK ("MESSAGE_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."SENDERS_RECEIVERS" ADD CONSTRAINT "SYS_C0011829" CHECK ("SENDER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."SENDERS_RECEIVERS" ADD CONSTRAINT "SYS_C0011830" CHECK ("RECEIVER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."SENDERS_RECEIVERS" ADD CONSTRAINT "SYS_C0011831" CHECK ("TIMESTAMP" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table TOS
-- ----------------------------
ALTER TABLE "TFUSER24"."TOS" ADD CONSTRAINT "SYS_C0011812" PRIMARY KEY ("USER_ID", "RECEIVER_ID");

-- ----------------------------
-- Checks structure for table TOS
-- ----------------------------
ALTER TABLE "TFUSER24"."TOS" ADD CONSTRAINT "SYS_C0011810" CHECK ("USER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."TOS" ADD CONSTRAINT "SYS_C0011811" CHECK ("RECEIVER_ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Primary Key structure for table USERS
-- ----------------------------
ALTER TABLE "TFUSER24"."USERS" ADD CONSTRAINT "SYS_C0011774" PRIMARY KEY ("ID");

-- ----------------------------
-- Checks structure for table USERS
-- ----------------------------
ALTER TABLE "TFUSER24"."USERS" ADD CONSTRAINT "SYS_C0011770" CHECK ("ID" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."USERS" ADD CONSTRAINT "SYS_C0011771" CHECK ("NAME" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."USERS" ADD CONSTRAINT "SYS_C0011772" CHECK ("LOGIN" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."USERS" ADD CONSTRAINT "SYS_C0011773" CHECK ("PASS" IS NOT NULL) NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table DELETED_MESSAGES
-- ----------------------------
ALTER TABLE "TFUSER24"."DELETED_MESSAGES" ADD CONSTRAINT "SYS_C0025694" FOREIGN KEY ("PLACE_ID") REFERENCES "TFUSER24"."PLACES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table FROMS
-- ----------------------------
ALTER TABLE "TFUSER24"."FROMS" ADD CONSTRAINT "SYS_C0011806" FOREIGN KEY ("USER_ID") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."FROMS" ADD CONSTRAINT "SYS_C0011807" FOREIGN KEY ("SENDER_ID") REFERENCES "TFUSER24"."SENDERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table GROUPS
-- ----------------------------
ALTER TABLE "TFUSER24"."GROUPS" ADD CONSTRAINT "SYS_C0011783" FOREIGN KEY ("ID") REFERENCES "TFUSER24"."PLACES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."GROUPS" ADD CONSTRAINT "SYS_C0011784" FOREIGN KEY ("CREATED_BY") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table HIDDEN
-- ----------------------------
ALTER TABLE "TFUSER24"."HIDDEN" ADD CONSTRAINT "SYS_C0011839" FOREIGN KEY ("USER_ID") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."HIDDEN" ADD CONSTRAINT "SYS_C0011840" FOREIGN KEY ("PLACE_ID") REFERENCES "TFUSER24"."PLACES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table INBOXES
-- ----------------------------
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "SYS_C0021005" FOREIGN KEY ("ID") REFERENCES "TFUSER24"."PLACES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "SYS_C0021006" FOREIGN KEY ("UID_1") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."INBOXES" ADD CONSTRAINT "SYS_C0021007" FOREIGN KEY ("UID_2") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table MEMBERS
-- ----------------------------
ALTER TABLE "TFUSER24"."MEMBERS" ADD CONSTRAINT "SYS_C0011799" FOREIGN KEY ("USER_ID") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."MEMBERS" ADD CONSTRAINT "SYS_C0011800" FOREIGN KEY ("GROUP_ID") REFERENCES "TFUSER24"."GROUPS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table MESSAGES
-- ----------------------------
ALTER TABLE "TFUSER24"."MESSAGES" ADD CONSTRAINT "FK_PLACE" FOREIGN KEY ("PLACE_ID") REFERENCES "TFUSER24"."PLACES" ("ID") ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table REACTS
-- ----------------------------
ALTER TABLE "TFUSER24"."REACTS" ADD CONSTRAINT "SYS_C0011856" FOREIGN KEY ("MESSAGE_ID") REFERENCES "TFUSER24"."MESSAGES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REACTS" ADD CONSTRAINT "SYS_C0011857" FOREIGN KEY ("USER_ID") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REACTS" ADD CONSTRAINT "SYS_C0011858" FOREIGN KEY ("REACTION_ID") REFERENCES "TFUSER24"."REACTIONS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table REPLIES
-- ----------------------------
ALTER TABLE "TFUSER24"."REPLIES" ADD CONSTRAINT "SYS_C0011826" FOREIGN KEY ("MSG_ID_1") REFERENCES "TFUSER24"."MESSAGES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."REPLIES" ADD CONSTRAINT "SYS_C0011827" FOREIGN KEY ("MSG_ID_2") REFERENCES "TFUSER24"."MESSAGES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table SEEN
-- ----------------------------
ALTER TABLE "TFUSER24"."SEEN" ADD CONSTRAINT "SYS_C0011845" FOREIGN KEY ("USER_ID") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."SEEN" ADD CONSTRAINT "SYS_C0011846" FOREIGN KEY ("MESSAGE_ID") REFERENCES "TFUSER24"."MESSAGES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table SENDERS_RECEIVERS
-- ----------------------------
ALTER TABLE "TFUSER24"."SENDERS_RECEIVERS" ADD CONSTRAINT "SYS_C0011833" FOREIGN KEY ("MESSAGE_ID") REFERENCES "TFUSER24"."MESSAGES" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."SENDERS_RECEIVERS" ADD CONSTRAINT "SYS_C0011834" FOREIGN KEY ("SENDER_ID") REFERENCES "TFUSER24"."SENDERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."SENDERS_RECEIVERS" ADD CONSTRAINT "SYS_C0011835" FOREIGN KEY ("RECEIVER_ID") REFERENCES "TFUSER24"."RECEIVERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;

-- ----------------------------
-- Foreign Keys structure for table TOS
-- ----------------------------
ALTER TABLE "TFUSER24"."TOS" ADD CONSTRAINT "SYS_C0011813" FOREIGN KEY ("USER_ID") REFERENCES "TFUSER24"."USERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
ALTER TABLE "TFUSER24"."TOS" ADD CONSTRAINT "SYS_C0011814" FOREIGN KEY ("RECEIVER_ID") REFERENCES "TFUSER24"."RECEIVERS" ("ID") NOT DEFERRABLE INITIALLY IMMEDIATE NORELY VALIDATE;
