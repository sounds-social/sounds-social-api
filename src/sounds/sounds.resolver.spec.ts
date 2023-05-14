import { Test, TestingModule } from '@nestjs/testing';
import { SoundsResolver } from './sounds.resolver';
import { SoundsService } from './sounds.service';

describe('SoundsResolver', () => {
  let resolver: SoundsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoundsResolver, SoundsService],
    }).compile();

    resolver = module.get<SoundsResolver>(SoundsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
