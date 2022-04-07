const RegisterComment = require('../../../Domains/comment/entities/RegisterComment');
const RegisteredComment = require('../../../Domains/comment/entities/RegisteredComment');
const CommentRepository = require('../../../Domains/comment/CommentRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const ThreadRepository = require('../../../Domains/thread/ThreadRepository');

describe('first', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const useCasePayload = {
      threadId: 'threadId',
      content: 'content',
      owner: 'owner',
    };

    const expectedRegisteredComment = new RegisteredComment({
      id: 'threadId',
      content: 'content',
      owner: 'owner',
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();
    
    mockCommentRepository.addComment = jest.fn(() => Promise.resolve(expectedRegisteredComment));
    mockThreadRepository.verifyAvailableThread = jest.fn(() => Promise.resolve());
  
    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
    
    const registeredComment = await getCommentUseCase.execute(useCasePayload);

    expect(registeredComment).toStrictEqual(expectedRegisteredComment);
    expect(mockCommentRepository.addComment).toBeCalledWith(new RegisterComment({
      threadId: useCasePayload.threadId,
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    }));
  });
  
})