#!/usr/bin/env ts-node

// tslint:disable:arrow-parens
// tslint:disable:max-line-length
// tslint:disable:member-ordering
// tslint:disable:no-shadowed-variable
// tslint:disable:unified-signatures
import test  from 'blue-tape'
import sinon from 'sinon'

import {
  FileBox,
}                 from 'file-box'
import {
  MemoryCard,
}                       from 'memory-card'
import {
  ContactGender,
  ContactPayload,
  ContactPayloadFilterFunction,
  ContactQueryFilter,
  ContactType,
  // ContactPayloadFilterFactory,
}                                 from './schemas/contact'
import {
  FriendshipPayload,
}                                 from './schemas/friendship'
import {
  MessagePayload,
}                                 from './schemas/message'
import {
  RoomMemberPayload,
  RoomPayload,
  RoomPayloadFilterFunction,
  RoomQueryFilter,
}                                 from './schemas/room'

import {
  Receiver,
}                                 from './schemas/puppet'

import {
  Puppet,
}                                 from './puppet'

class PuppetTest extends Puppet {
  public async start () : Promise<void> { return {} as any }
  public async stop ()  : Promise<void> { return {} as any }

  public async ding (data?: string)   : Promise<void> { return data as void }
  public async logout () : Promise<void> { return {} as any }

  /**
   *
   * Contact
   *
   */
  public async contactAlias (contactId: string)                        : Promise<string>
  public async contactAlias (contactId: string, alias: string | null)  : Promise<void>
  public async contactAlias (contactId: string, alias?: string | null) : Promise<string | void> { return { contactId, alias } as any }

  public async contactAvatar (contactId: string)                 : Promise<FileBox>
  public async contactAvatar (contactId: string, file: FileBox)  : Promise<void>
  public async contactAvatar (contactId: string, file?: FileBox) : Promise<void | FileBox> { return { contactId, file } as any }

  public async contactList ()                    : Promise<string[]> { return {} as any }
  public async contactQrcode (contactId: string) : Promise<string> { return { contactId } as any }

  public async contactRawPayload (id: string)            : Promise<any> { return { id } as any }
  public async contactRawPayloadParser (rawPayload: any) : Promise<ContactPayload> { return { rawPayload } as any }

  /**
   *
   * Friendship
   *
   */
  public async friendshipRawPayload (id: string)            : Promise<any> { return { id } as any }
  public async friendshipRawPayloadParser (rawPayload: any) : Promise<FriendshipPayload> { return rawPayload }

  public async friendshipAdd (contactId: string, hello?: string) : Promise<void> { return { contactId, hello } as any }
  public async friendshipAccept (friendshipId: string)           : Promise<void> { return { friendshipId } as any }

  /**
   *
   * Message
   *
   */
  public async messageFile (messageId: string)                            : Promise<FileBox> { return { messageId } as any }
  public async messageForward (to: Receiver, messageId: string)           : Promise<void> { return { to, messageId } as any }
  public async messageSendContact (receiver: Receiver, contactId: string) : Promise<void> { return { receiver, contactId } as any }
  public async messageSendFile (to: Receiver, file: FileBox)              : Promise<void> { return { to, file } as any }
  public async messageSendText (to: Receiver, text: string)               : Promise<void> { return { to, text } as any }

  public async messageRawPayload (id: string)            : Promise<any> { return { id } as any }
  public async messageRawPayloadParser (rawPayload: any) : Promise<MessagePayload> { return { rawPayload } as any }

  /**
   *
   * Room
   *
   */
  public async roomAnnounce (roomId: string)                : Promise<string>
  public async roomAnnounce (roomId: string, text: string)  : Promise<void>
  public async roomAnnounce (roomId: string, text?: string) : Promise<void | string> { return { roomId, text } as any }

  public async roomAdd (roomId: string, contactId: string)          : Promise<void> { return { roomId, contactId } as any }
  public async roomAvatar (roomId: string)                          : Promise<FileBox> { return { roomId } as any }
  public async roomCreate (contactIdList: string[], topic?: string) : Promise<string> { return { contactIdList, topic } as any }
  public async roomDel (roomId: string, contactId: string)          : Promise<void> { return { roomId, contactId } as any }
  public async roomQuit (roomId: string)                            : Promise<void> { return { roomId } as any }
  public async roomQrcode (roomId: string)                          : Promise<string> { return { roomId } as any }

  public async roomTopic (roomId: string)                 : Promise<string>
  public async roomTopic (roomId: string, topic: string)  : Promise<void>
  public async roomTopic (roomId: string, topic?: string) : Promise<string | void> { return { roomId, topic } as any }

  public async roomList ()                     : Promise<string[]> { return {} as any }
  public async roomMemberList (roomId: string) : Promise<string[]> { return { roomId } as any }

  public async roomRawPayload (id: string)            : Promise<any> { return { id } as any }
  public async roomRawPayloadParser (rawPayload: any) : Promise<RoomPayload> { return { rawPayload } as any }

  public async roomMemberRawPayload (roomId: string, contactId: string) : Promise<any> { return { roomId, contactId } as any }
  public async roomMemberRawPayloadParser (rawPayload: any)             : Promise<RoomMemberPayload> { return rawPayload }

  /**
   * expose to public for internal methods:
   */
  public roomQueryFilterFactory (
    query: RoomQueryFilter,
  ): RoomPayloadFilterFunction {
    return super.roomQueryFilterFactory(query)
  }

  public contactQueryFilterFactory (
    query: ContactQueryFilter,
  ): ContactPayloadFilterFunction {
    return super.contactQueryFilterFactory(query)
  }

}

test('contactQueryFilterFunction()', async t => {

  const TEXT_REGEX = 'query by regex'
  const TEXT_TEXT  = 'query by text'

  const PAYLOAD_LIST: ContactPayload[] = [
    {
      alias  : TEXT_TEXT,
      avatar : 'mock',
      gender : ContactGender.Unknown,
      id     : 'id1',
      name   : TEXT_REGEX,
      type   : ContactType.Personal,
    },
    {
      alias  : TEXT_REGEX,
      avatar : 'mock',
      gender : ContactGender.Unknown,
      id     : 'id2',
      name   : TEXT_TEXT,
      type   : ContactType.Personal,
    },
    {
      alias  : TEXT_TEXT,
      avatar : 'mock',
      gender : ContactGender.Unknown,
      id     : 'id3',
      name   : TEXT_REGEX,
      type   : ContactType.Personal,
    },
    {
      alias  : TEXT_REGEX,
      avatar : 'mock',
      gender : ContactGender.Unknown,
      id     : 'id4',
      name   : TEXT_TEXT,
      type   : ContactType.Personal,
    },
  ]

  const REGEX_VALUE = new RegExp(TEXT_REGEX)
  const TEXT_VALUE  = TEXT_TEXT

  const puppet = new PuppetTest({ memory: new MemoryCard() })

  t.test('filter name by regex', async t => {
    const QUERY   = { name: REGEX_VALUE }
    const ID_LIST = ['id1', 'id3']

    const func = puppet.contactQueryFilterFactory(QUERY)
    const idList = PAYLOAD_LIST.filter(func).map(payload => payload.id)
    t.deepEqual(idList, ID_LIST, 'should filter the query to id list')
  })

  t.test('filter name by text', async t => {
    const QUERY = { name: TEXT_VALUE }
    const ID_LIST = ['id2', 'id4']

    const func = puppet.contactQueryFilterFactory(QUERY)
    const idList = PAYLOAD_LIST.filter(func).map(payload => payload.id)
    t.deepEqual(idList, ID_LIST, 'should filter query to id list')
  })

  t.test('filter alias by regex', async t => {
    const QUERY = { alias: REGEX_VALUE }
    const ID_LIST = ['id2', 'id4']

    const func = puppet.contactQueryFilterFactory(QUERY)
    const idList = PAYLOAD_LIST.filter(func).map(payload => payload.id)
    t.deepEqual(idList, ID_LIST, 'should filter query to id list')
  })

  t.test('filter alias by text', async t => {
    const QUERY = { alias: TEXT_VALUE }
    const ID_LIST = ['id1', 'id3']

    const func = puppet.contactQueryFilterFactory(QUERY)
    const idList = PAYLOAD_LIST.filter(func).map(payload => payload.id)
    t.deepEqual(idList, ID_LIST, 'should filter query to id list')
  })

  t.test('throw if filter key unknown', async t => {
    t.throws(() => puppet.contactQueryFilterFactory({ xxxx: 'test' } as any), 'should throw')
  })

  t.test('throw if filter key are more than one', async t => {
    t.throws(() => puppet.contactQueryFilterFactory({
      alias : 'test',
      name  : 'test',
    }), 'should throw')
  })
})

test('roomQueryFilterFunction()', async t => {

  const TEXT_REGEX = 'query by regex'
  const TEXT_TEXT  = 'query by text'

  const PAYLOAD_LIST: RoomPayload[] = [
    {
      id           : 'id1',
      memberIdList : [],
      topic        : TEXT_TEXT,
    },
    {
      id           : 'id2',
      memberIdList : [],
      topic        : TEXT_REGEX,
    },
    {
      id           : 'id3',
      memberIdList : [],
      topic        : TEXT_TEXT,
    },
    {
      id           : 'id4',
      memberIdList : [],
      topic        : TEXT_REGEX,
    },
  ]

  const REGEX_VALUE = new RegExp(TEXT_REGEX)
  const TEXT_VALUE  = TEXT_TEXT

  const puppet = new PuppetTest({ memory: new MemoryCard() })

  t.test('filter name by regex', async t => {
    const QUERY   = { topic: REGEX_VALUE }
    const ID_LIST = ['id2', 'id4']

    const func = puppet.roomQueryFilterFactory(QUERY)
    const idList = PAYLOAD_LIST.filter(func).map(payload => payload.id)
    t.deepEqual(idList, ID_LIST, 'should filter the query to id list')
  })

  t.test('filter name by text', async t => {
    const QUERY = { topic: TEXT_VALUE }
    const ID_LIST = ['id1', 'id3']

    const func = puppet.roomQueryFilterFactory(QUERY)
    const idList = PAYLOAD_LIST.filter(func).map(payload => payload.id)
    t.deepEqual(idList, ID_LIST, 'should filter query to id list')
  })

  t.test('throw if filter key unknown', async t => {
    t.throws(() => puppet.roomQueryFilterFactory({ xxx: 'test' } as any), 'should throw')
  })

  t.test('throw if filter key are more than one', async t => {
    t.throws(() => puppet.roomQueryFilterFactory({
      alias: 'test',
      topic: 'test',
    } as any), 'should throw')
  })
})

test('contactRoomList()', async t => {
  const puppet = new PuppetTest({ memory: new MemoryCard() })

  const sandbox = sinon.createSandbox()

  const CONTACT_ID_1 = 'contact-id-1'
  const CONTACT_ID_2 = 'contact-id-2'
  const CONTACT_ID_3 = 'contact-id-3'

  const ROOM_ID_1 = 'room-id-1'
  const ROOM_ID_2 = 'room-id-2'

  const ROOM_PAYLOAD_LIST: RoomPayload[] = [
    {
      id: ROOM_ID_1,
      memberIdList: [
        CONTACT_ID_1,
        CONTACT_ID_2,
      ],
      topic: 'room-topic-1',
    },
    {
      id: ROOM_ID_2,
      memberIdList: [
        CONTACT_ID_2,
        CONTACT_ID_3,
      ],
      topic: 'room-topic-2',
    },
  ]
  sandbox.stub(puppet, 'roomList').resolves(ROOM_PAYLOAD_LIST.map(payload => payload.id))
  sandbox.stub(puppet, 'roomPayload').callsFake(roomId => {
    for (const payload of ROOM_PAYLOAD_LIST) {
      if (payload.id === roomId) {
        return payload
      }
    }
    throw new Error('no payload for room id ' + roomId)
  })

  const roomIdList1 = await puppet.contactRoomList(CONTACT_ID_1)
  const roomIdList2 = await puppet.contactRoomList(CONTACT_ID_2)
  const roomIdList3 = await puppet.contactRoomList(CONTACT_ID_3)

  t.deepEqual(roomIdList1, [ROOM_ID_1], 'should get room 1 for contact 1')
  t.deepEqual(roomIdList2, [ROOM_ID_1, ROOM_ID_2], 'should get room 1&2 for contact 2')
  t.deepEqual(roomIdList3, [ROOM_ID_2], 'should get room 2 for contact 3')
})
