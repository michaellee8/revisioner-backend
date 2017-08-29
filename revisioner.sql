-- MySQL Script generated by MySQL Workbench
-- Tuesday, August 29, 2017 AM09:52:16 HKT
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema revisioner
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema revisioner
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `revisioner` DEFAULT CHARACTER SET utf8 ;
USE `revisioner` ;

-- -----------------------------------------------------
-- Table `revisioner`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userFirebaseAuthId` TEXT NOT NULL,
  `userName` TEXT NOT NULL,
  `userPhotoUrl` TEXT NULL,
  `userLastInteractionTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userCreateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userIntro` TEXT NULL,
  PRIMARY KEY (`userId`),
  INDEX `userFirebaseAuthId` (`userFirebaseAuthId` ASC),
  INDEX `userName` (`userName` ASC),
  FULLTEXT INDEX `userName` (`userName` ASC),
  FULLTEXT INDEX `userIntro` (`userIntro` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionSets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionSets` (
  `questionSetId` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NOT NULL,
  `questionSetTitle` TEXT NOT NULL,
  `questionSetIntro` TEXT NULL,
  `questionSetSubject` TEXT NULL,
  `questionSetCreateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `questionSetLastUpdateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionSetId`),
  INDEX `userId` (`userId` ASC),
  FULLTEXT INDEX `questionSetTitle` (`questionSetTitle` ASC),
  FULLTEXT INDEX `questionSetIntro` (`questionSetIntro` ASC),
  INDEX `questionSetSubject` (`questionSetSubject` ASC),
  FULLTEXT INDEX `questionSetSubject` (`questionSetSubject` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questions` (
  `questionId` INT NOT NULL AUTO_INCREMENT,
  `questionSetId` INT NOT NULL,
  `questionTitle` MEDIUMTEXT NULL DEFAULT NULL,
  `questionContent` MEDIUMTEXT NOT NULL DEFAULT NULL,
  `questionMediaUrl` MEDIUMTEXT NULL DEFAULT NULL,
  `questionType` TEXT NOT NULL,
  `questionCreateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `questionLastUpdateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionId`),
  INDEX `questionSetId` (`questionSetId` ASC),
  FULLTEXT INDEX `questionTitle` (`questionTitle` ASC),
  FULLTEXT INDEX `questionContent` (`questionContent` ASC),
  INDEX `questionType` (`questionType` ASC),
  CONSTRAINT `questionSetId`
    FOREIGN KEY (`questionSetId`)
    REFERENCES `revisioner`.`questionSets` (`questionSetId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `revisioner`.`questionAnswers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionAnswers` (
  `questionAnswerId` INT NOT NULL AUTO_INCREMENT,
  `questionId` INT(11) NOT NULL,
  `questionAnswerMediaUrl` TEXT NULL,
  `questionAnswerText` TEXT NOT NULL,
  `questionAnswerIsCorrect` TINYINT(1) NOT NULL,
  `questionAnswerScore` INT(11) NOT NULL,
  `questionAnswerCreateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `questionLastUpdateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionAnswerId`),
  INDEX `questionId` (`questionId` ASC),
  CONSTRAINT `questionId`
    FOREIGN KEY (`questionId`)
    REFERENCES `revisioner`.`questions` (`questionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`userTags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`userTags` (
  `userTagId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `userTagContent` TEXT NOT NULL,
  PRIMARY KEY (`userTagId`),
  INDEX `userId` (`userId` ASC),
  INDEX `userTagContent` (`userTagContent` ASC),
  FULLTEXT INDEX `userTagContent` (`userTagContent` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionTags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionTags` (
  `questionTagId` INT NOT NULL AUTO_INCREMENT,
  `questionTagContent` TEXT NOT NULL,
  `questionId` INT(11) NOT NULL,
  PRIMARY KEY (`questionTagId`),
  INDEX `questionId` (`questionId` ASC),
  INDEX `questionTagContent` (`questionTagContent` ASC),
  FULLTEXT INDEX `questionTagContent` (`questionTagContent` ASC),
  CONSTRAINT `questionId`
    FOREIGN KEY (`questionId`)
    REFERENCES `revisioner`.`questions` (`questionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionSetsTags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionSetsTags` (
  `questionSetTagId` INT NOT NULL AUTO_INCREMENT,
  `questionSetId` INT NOT NULL,
  `questionSetContent` TEXT NOT NULL,
  PRIMARY KEY (`questionSetTagId`),
  INDEX `questionSetId` (`questionSetId` ASC),
  INDEX `questionSetContent` (`questionSetContent` ASC),
  FULLTEXT INDEX `questionSetContent` (`questionSetContent` ASC),
  CONSTRAINT `questionSetId`
    FOREIGN KEY (`questionSetId`)
    REFERENCES `revisioner`.`questionSets` (`questionSetId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionSetFollows`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionSetFollows` (
  `questionSetFollowId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `questionSetId` INT NOT NULL,
  `questionSetFollowTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionSetFollowId`),
  INDEX `userId` (`userId` ASC),
  INDEX `questionSetId` (`questionSetId` ASC),
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `questionSetId`
    FOREIGN KEY (`questionSetId`)
    REFERENCES `revisioner`.`questionSets` (`questionSetId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionSumbits`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionSumbits` (
  `questionSumbitId` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `questionAnswerId` INT NOT NULL,
  `questionSumbitTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionSumbitId`),
  INDEX `userId` (`userId` ASC),
  INDEX `questionAnswerId` (`questionAnswerId` ASC),
  CONSTRAINT `questionAnswerId`
    FOREIGN KEY (`questionAnswerId`)
    REFERENCES `revisioner`.`questionAnswers` (`questionAnswerId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionReactionTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionReactionTypes` (
  `questionReactionType` TEXT NOT NULL,
  `questionReactionTypeWeight` INT NOT NULL,
  UNIQUE INDEX `questionReactionType_UNIQUE` (`questionReactionType` ASC),
  PRIMARY KEY (`questionReactionType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionReactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionReactions` (
  `questionReactionId` INT NOT NULL AUTO_INCREMENT,
  `questionReactionType` TEXT NOT NULL,
  `questionId` INT NOT NULL,
  `userId` INT NOT NULL,
  `questionReactionTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionReactionId`),
  INDEX `questionReactionType` (`questionReactionType` ASC),
  INDEX `questionId` (`questionId` ASC),
  INDEX `userId` (`userId` ASC),
  CONSTRAINT `questionId`
    FOREIGN KEY (`questionId`)
    REFERENCES `revisioner`.`questions` (`questionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `questionReactionType`
    FOREIGN KEY (`questionReactionType`)
    REFERENCES `revisioner`.`questionReactionTypes` (`questionReactionType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionSetReactionTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionSetReactionTypes` (
  `questionSetReactionType` TEXT NOT NULL,
  `questionSetReactionTypeWeight` INT NOT NULL,
  UNIQUE INDEX `questionReactionType_UNIQUE` (`questionSetReactionType` ASC),
  PRIMARY KEY (`questionSetReactionType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionSetReactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionSetReactions` (
  `questionSetReactionId` INT NOT NULL AUTO_INCREMENT,
  `questionSetReactionType` TEXT NOT NULL,
  `questionSetId` INT NOT NULL,
  `userId` INT NOT NULL,
  `questionSetReactionTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionSetReactionId`),
  INDEX `questionSetReactionType` (`questionSetReactionType` ASC),
  INDEX `questionSetId` (`questionSetId` ASC),
  INDEX `userId` (`userId` ASC),
  CONSTRAINT `questionSetId`
    FOREIGN KEY (`questionSetId`)
    REFERENCES `revisioner`.`questionSets` (`questionSetId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `questionSetReactionType`
    FOREIGN KEY (`questionSetReactionType`)
    REFERENCES `revisioner`.`questionSetReactionTypes` (`questionSetReactionType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`userReactionTypes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`userReactionTypes` (
  `userReactionType` TEXT NOT NULL,
  `userReactionTypeWeight` INT NOT NULL,
  UNIQUE INDEX `questionReactionType_UNIQUE` (`userReactionType` ASC),
  PRIMARY KEY (`userReactionType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`userReactions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`userReactions` (
  `userReactionId` INT NOT NULL AUTO_INCREMENT,
  `userReactionType` TEXT NOT NULL,
  `targetUserId` INT NOT NULL,
  `userId` INT NOT NULL,
  `userReactionTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userReactionId`),
  INDEX `userReactionType` (`userReactionType` ASC),
  INDEX `targetUserId` (`targetUserId` ASC),
  INDEX `userId` (`userId` ASC),
  CONSTRAINT `userReactionType`
    FOREIGN KEY (`userReactionType`)
    REFERENCES `revisioner`.`userReactionTypes` (`userReactionType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `targetUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionComments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionComments` (
  `questionCommentId` INT NOT NULL AUTO_INCREMENT,
  `questionId` INT NOT NULL,
  `userId` INT NOT NULL,
  `questionCommentContent` TEXT NOT NULL,
  `questionCommentCreateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `questionCommentLastUpdateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionCommentId`),
  INDEX `questionId` (`questionId` ASC),
  INDEX `userId` (`userId` ASC),
  FULLTEXT INDEX `questionCommentContent` (`questionCommentContent` ASC),
  CONSTRAINT `questionId`
    FOREIGN KEY (`questionId`)
    REFERENCES `revisioner`.`questions` (`questionId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `revisioner`.`questionSetComments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `revisioner`.`questionSetComments` (
  `questionSetCommentId` INT NOT NULL AUTO_INCREMENT,
  `questionSetId` INT NOT NULL,
  `userId` INT NOT NULL,
  `questionSetCommentContent` TEXT NOT NULL,
  `questionSetCommentCreateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `questionSetCommentLastUpdateTimestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`questionSetCommentId`),
  INDEX `questionSetId` (`questionSetId` ASC),
  INDEX `userId` (`userId` ASC),
  FULLTEXT INDEX `questionSetCommentContent` (`questionSetCommentContent` ASC),
  CONSTRAINT `questionSetId`
    FOREIGN KEY (`questionSetId`)
    REFERENCES `revisioner`.`questionSets` (`questionSetId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `revisioner`.`users` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
