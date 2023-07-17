import * as hre from "hardhat";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Greeter__factory, Greeter } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Greater", () => {
    let user: SignerWithAddress;
    let greeter: Greeter;

    beforeEach(async () => {
        const accounts: SignerWithAddress[] = await ethers.getSigners();
        user = accounts[0];

        const Greeter: Greeter__factory = await ethers.getContractFactory(
            "Greeter",
        );
        greeter = await Greeter.deploy("Hello");

        hre.tracer.nameTags[await greeter.getAddress()] = "Greeter";
    });

    describe("Deployment", () => {
        it("Should deploy successfully", async () => {
            expect(await greeter.greet()).to.equal("Hello");
        });
    });

    describe("Set greeting", () => {
        it("Should set successfully", async () => {
            await greeter.connect(user).setGreeting("New hello");
            expect(await greeter.greet()).to.equal("New hello");
            expect(await greeter.returnUint256(100)).to.equal(100);
        });
    });

    describe("Skip times", () => {
        it("Skip times", async () => {
            await time.increase(1000);
        });
    });
});
