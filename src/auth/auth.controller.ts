import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import type { AuthUser } from './jwt.strategy';
import { AuthDto } from './dto/auth.dto';

interface AuthRequest {
  user: AuthUser;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: AuthDto })
  @Post('signup')
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body.email, body.password);
  }

  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({ type: AuthDto })
  @Post('login')
  login(@Body() body: AuthDto) {
    return this.authService.login(body.email, body.password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req: AuthRequest): AuthUser {
    return req.user;
  }
}
