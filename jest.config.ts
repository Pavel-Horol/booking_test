import { transform } from "typescript";

export default {
    roots: ['./tests'],
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.ts$': 'ts-jest', 
      },
      moduleFileExtensions: ['ts', 'js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
      },
      testEnvironment: 'node',
}