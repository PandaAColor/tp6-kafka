import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class LoyaltyController {
  @EventPattern('activation.requested')
  handleActivation(@Payload() message: any) {
    console.log('[loyalty] activation.requested:', JSON.stringify(message));
  }

  @EventPattern('billing.events')
  handleBilling(@Payload() message: any) {
    console.log('[loyalty] billing.events:', JSON.stringify(message));
  }
}
