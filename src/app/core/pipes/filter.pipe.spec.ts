import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(()=>{
    pipe = new FilterPipe();
  })

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

});


