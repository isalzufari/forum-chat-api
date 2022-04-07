const RegisterThread = require('../../../Domains/thread/entities/RegisterThread');
const RegisteredThread = require('../../../Domains/thread/entities/RegisteredThread');
const ThreadRepository = require('../../../Domains/thread/ThreadRepository');
const addThreadUseCase =  require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const useCasePayload = {
      title: 'title',
      body: 'body',
      owner: 'owner',
    };

    const expectedAddedThread = new RegisteredThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner,
    });

    const mockThreadRepository = new ThreadRepository();
    
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread));

    const getThreadUseCase = new addThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const registerThread = await getThreadUseCase.execute(useCasePayload);

    expect(registerThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(
      new RegisterThread({
        title: useCasePayload.title,
        body: useCasePayload.body,
        owner: useCasePayload.owner,
      }),
    );
  });
});
