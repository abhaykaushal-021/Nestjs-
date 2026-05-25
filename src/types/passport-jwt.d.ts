declare module 'passport-jwt' {
  export interface StrategyOptions {
    jwtFromRequest: (request: unknown) => string | null;
    secretOrKey: string;
  }

  export class Strategy {
    constructor(options: StrategyOptions);
  }

  export class ExtractJwt {
    static fromAuthHeaderAsBearerToken(): (request: unknown) => string | null;
  }
}
