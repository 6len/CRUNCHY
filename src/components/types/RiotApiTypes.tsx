import {PlatformId} from "@fightmegg/riot-rate-limiter";

export type RequestOptions =
    {
        id: string;
        priority?: number;
        expiration?: number;
        params?: {
            [key: string
                ]:
                string | number | number[] | undefined
        };
        body?: object;
        method?: "POST" | "GET" | "PUT";
        headers?: {
            [key: string
                ]:
                string
        };
    }

export enum QUEUE {
    RANKED_SOLO_5x5 = "SOLO Q",
    RANKED_TFT = "RANKED_TFT",
    RANKED_FLEX_SR = "FLEX Q",
    RANKED_FLEX_TT = "RANKED_FLEX_TT",
}

export enum POSITION_ORDER {
    TOP = 0,
    JUNGLE = 1,
    NONE = 1,
    MIDDLE = 2,
    BOT = 3,
    BOTTOM= 4,
}

export enum TIER {
    CHALLENGER = "CHALLENGER",
    GRANDMASTER = "GRANDMASTER",
    MASTER = "MASTER",
    DIAMOND = "DIAMOND",
    PLATINUM = "PLATINUM",
    GOLD = "GOLD",
    SILVER = "SILVER",
    BRONZE = "BRONZE",
    IRON = "IRON",
}

export enum TFT_TIER {
    DIAMOND = "DIAMOND",
    PLATINUM = "PLATINUM",
    GOLD = "GOLD",
    SILVER = "SILVER",
    BRONZE = "BRONZE",
    IRON = "IRON",
}

export enum DIVISION {
    I = "I",
    II = "II",
    III = "III",
    IV = "IV",
}

export enum VAL_QUEUE {
    COMPETITIVE = "competitive",
    UNRATED = "unrated",
    SPIKERUSH = "spikerush",
}

export type VALCluster =
    | PlatformId.AP
    | PlatformId.BR
    | PlatformId.EU
    | PlatformId.KR
    | PlatformId.LATAM
    | PlatformId.NA;

export type LORCluster =
    | PlatformId.AMERICAS
    | PlatformId.ASIA
    | PlatformId.EUROPE
    | PlatformId.SEA;

export type Cluster =
    | PlatformId.EUROPE
    | PlatformId.AMERICAS
    | PlatformId.ASIA;

export type LoLRegion =
    | PlatformId.BR1
    | PlatformId.EUNE1
    | PlatformId.EUW1
    | PlatformId.JP1
    | PlatformId.KR
    | PlatformId.LA1
    | PlatformId.LA2
    | PlatformId.NA1
    | PlatformId.OC1
    | PlatformId.RU
    | PlatformId.TR1;

export namespace Account {
    export type AccountDTO = {
        puuid: string;
        gameName?: string;
        tagLine?: string;
    }

    export type ActiveShardDTO = {
        puuid: string;
        game: string;
        activeShard: string;
    }
}

export namespace ChampionMastery {
    export type ChampionMasteryDTO = {
        championPointsUntilNextLevel: number;
        chestGranted: boolean;
        championId: number;
        lastPlayTime: number;
        championLevel: number;
        summonerId: string;
        championPoints: number;
        championPointsSinceLastLevel: number;
        tokensEarned: number;
    }
}

export namespace Champion {
    export type ChampionInfoDTO = {
        maxNewPlayerLevel: number;
        freeChampionIdsForNewPlayers: number[];
        freeChampionIds: number[];
    }
}

export namespace Clash {
    export type PlayerDTO = {
        summonerId: string;
        teamId: string;
        position:
            | "UNSELECTED"
            | "FILL"
            | "TOP"
            | "JUNGLE"
            | "MIDDLE"
            | "BOTTOM"
            | "UTILITY";
        role: "CAPTAIN" | "MEMBER";
    }

    export type TeamDTO = {
        id: string;
        tournamentId: number;
        name: string;
        iconId: number;
        tier: number;
        captain: string; // SummonerId of Captain
        abbreviation: string;
        players: Clash.PlayerDTO[] /** Team members. */;
    }

    export type TournamentPhaseDTO = {
        id: number;
        registrationTime: number;
        startTime: number;
        cancelled: boolean;
    }

    export type TournamentDTO = {
        id: number;
        themeId: number;
        nameKey: string;
        nameKeySecondary: string;
        schedule: Clash.TournamentPhaseDTO[];
    }
}

export type MiniSeriesDTO = {
    losses: number;
    progress: string;
    target: number;
    wins: number;
}

export type LeagueEntryDTO = {
    leagueId: string;
    summonerId: string;
    summonerName: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    hotStreak: boolean;
    veteran: boolean;
    freshBlood: boolean;
    inactive: boolean;
    miniSeries?: MiniSeriesDTO | null;
}

export type LeagueItemDTO = {
    freshBlood: boolean;
    wins: number;
    summonerName: string;
    miniSeries?: MiniSeriesDTO | null;
    inactive: boolean;
    veteran: boolean;
    hotStreak: boolean;
    rank: string;
    leaguePoints: number;
    losses: number;
    summonerId: string;
}

export type LeagueListDTO = {
    leagueId: string;
    entries: LeagueItemDTO[];
    tier: string;
    name: string;
    queue: string;
}

export namespace LorMatch {
    export type PlayerDTO = {
        puuid: string;
        deck_id: string;
        deck_code: string;
        factions: string[];
        game_outcome: "win" | "loss" | string;
        order_of_play: 1 | 2 | number;
    }
    export type MatchDTO = {
        metadata: {
            data_version: string;
            match_id: string;
            participants: string[];
        };
        info: {
            game_mode: "Constructed" | "Expeditions" | "Tutorial";
            game_type:
                | "Ranked"
                | "Normal"
                | "AI"
                | "Tutorial"
                | "Singleton"
                | "StandardGauntlet";
            game_start_time_utc: string;
            game_version: string;
            players: LorMatch.PlayerDTO[];
            total_turn_count: number;
        };
    }
}

export namespace LorRanked {
    export type PlayerDTO = {
        name: string;
        rank: number;
        lp: number;
    }

    export type LeaderboardDTO = {
        /** A list of players in Master tier. */
        players: LorRanked.PlayerDTO[];
    }
}


export type MatchDTO = {
    gameId: number;
    participantIdentities: ParticipantIdentityDTO[];
    queueId: number;
    gameType: string;
    gameDuration: number;
    teams: TeamStatsDTO[];
    platformId: string;
    gameCreation: number;
    seasonId: number;
    gameVersion: string;
    mapId: number;
    gameMode: string;
    participants: ParticipantDTO[];
}

export type ParticipantIdentityDTO = {
    participantId: number;
    /** Player information not included in the response for custom matches. Custom matches are considered private unless a tournament code was used to create the  */
    player: PlayerDTO;
}

export type PlayerDTO = {
    profileIcon: number;
    /** Player's original accountId. */
    accountId: string;
    matchHistoryUri: string;
    /** Player's current accountId when the match was played. */
    currentAccountId: string;
    /** Player's current platformId when the match was played. */
    currentPlatformId: string;
    summonerName: string;
    /** Player's summonerId (Encrypted) */
    summonerId?: string | null;
    /** Player's original platformId. */
    platformId: string;
}

export type SummonerDTO = {
    accountId: string;
    profileIconId: number;
    revisionDate: number;
    name: string;
    id: string;
    puuid: string;
    summonerLevel: number;
}

export type TeamStatsDTO = {
    /** Number of towers the team destroyed. */
    towerKills: number;
    /** Number of times the team killed Rift Herald. */
    riftHeraldKills: number;
    /** Flag indicating whether or not the team scored the first blood. */
    firstBlood: boolean;
    /** Number of inhibitors the team destroyed. */
    inhibitorKills: number;
    /** If match queueId has a draft, contains banned champion data, otherwise empty. */
    bans: TeamBansDTO[];
    /** Flag indicating whether or not the team scored the first Baron kill. */
    firstBaron: boolean;
    /** Flag indicating whether or not the team scored the first Dragon kill. */
    firstDragon: boolean;
    /** For Dominion matches, specifies the points the team had at game end. */
    dominionVictoryScore: number;
    /** Number of times the team killed Dragon. */
    dragonKills: number;
    /** Number of times the team killed Baron. */
    baronKills: number;
    /** Flag indicating whether or not the team destroyed the first inhibitor. */
    firstInhibitor: boolean;
    /** Flag indicating whether or not the team destroyed the first tower. */
    firstTower: boolean;
    /** Number of times the team killed Vilemaw. */
    vilemawKills: number;
    /** Flag indicating whether or not the team scored the first Rift Herald kill. */
    firstRiftHerald: boolean;
    /** 100 for blue side. 200 for red side. */
    teamId: number;
    /** String indicating whether or not the team won. There are only two values visibile in public match history.
     (Legal values:  Fail,  Win) */
    win?: "Fail" | "Win" | null;
}

export type TeamBansDTO = {
    /** Banned championId. */
    championId: number;
    /** Turn during which the champion was banned. */
    pickTurn: number;
}

export type ParticipantDTO = {
    participantId: number;
    championId: number;
    /** List of legacy Rune information. Not included for matches played with Runes Reforged. */
    runes?: RuneDTO[] | null;
    /** Participant statistics. */
    stats: ParticipantStatsDTO;
    /** 100 for blue side. 200 for red side. */
    teamId: number;
    /** Participant timeline data. */
    timeline: ParticipantTimelineDTO;
    /** First Summoner Spell id. */
    spell1Id: number;
    /** Second Summoner Spell id. */
    spell2Id: number;
    /** Highest ranked tier achieved for the previous season in a specific subset of queueIds, if any, otherwise null. Used to display border in game loading screen. Please refer to the Ranked Info documentation.
     (Legal values:  CHALLENGER,  MASTER,  DIAMOND,  PLATINUM,  GOLD,  SILVER,  BRONZE,  UNRANKED) */
    highestAchievedSeasonTier?: TIER | "UNRANKED" | null;
    /** List of legacy Mastery information. Not included for matches played with Runes Reforged. */
    masteries?: MasteryDTO[] | null;
}

export type RuneDTO = {
    runeId: number;
    rank: number;
}

export type ParticipantStatsDTO = {
    item0: number;
    item2: number;
    totalUnitsHealed: number;
    item1: number;
    largestMultiKill: number;
    goldEarned: number;
    firstInhibitorKill?: boolean | null;
    physicalDamageTaken: number;
    nodeNeutralizeAssist?: number | null;
    totalPlayerScore?: number | null;
    champLevel: number;
    damageDealtToObjectives: number;
    totalDamageTaken: number;
    neutralMinionsKilled: number;
    deaths: number;
    tripleKills: number;
    magicDamageDealtToChampions: number;
    wardsKilled: number;
    pentaKills: number;
    damageSelfMitigated: number;
    largestCriticalStrike: number;
    nodeNeutralize?: number | null;
    totalTimeCrowdControlDealt: number;
    firstTowerKill?: boolean | null;
    magicDamageDealt: number;
    totalScoreRank?: number | null;
    nodeCapture?: number | null;
    wardsPlaced?: number | null;
    totalDamageDealt: number;
    timeCCingOthers: number;
    magicalDamageTaken: number;
    largestKillingSpree: number;
    totalDamageDealtToChampions: number;
    physicalDamageDealtToChampions: number;
    neutralMinionsKilledTeamJungle: number;
    totalMinionsKilled: number;
    firstInhibitorAssist?: boolean | null;
    visionWardsBoughtInGame: number;
    objectivePlayerScore?: number | null;
    kills: number;
    firstTowerAssist?: boolean | null;
    combatPlayerScore?: number | null;
    inhibitorKills?: number | null;
    turretKills?: number | null;
    participantId: number;
    trueDamageTaken: number;
    firstBloodAssist?: boolean | null;
    nodeCaptureAssist?: number | null;
    assists: number;
    teamObjective?: number | null;
    altarsNeutralized?: number | null;
    goldSpent: number;
    damageDealtToTurrets: number;
    altarsCaptured?: number | null;
    win: boolean;
    totalHeal: number;
    unrealKills: number;
    visionScore?: number | null;
    physicalDamageDealt: number;
    firstBloodKill?: boolean | null;
    longestTimeSpentLiving: number;
    killingSprees: number;
    sightWardsBoughtInGame?: number | null;
    trueDamageDealtToChampions: number;
    neutralMinionsKilledEnemyJungle: number;
    doubleKills: number;
    trueDamageDealt: number;
    quadraKills: number;
    item4: number;
    item3: number;
    item6: number;
    item5: number;
    playerScore0?: number | null;
    playerScore1?: number | null;
    playerScore2?: number | null;
    playerScore3?: number | null;
    playerScore4?: number | null;
    playerScore5?: number | null;
    playerScore6?: number | null;
    playerScore7?: number | null;
    playerScore8?: number | null;
    playerScore9?: number | null;
    /** Primary path keystone rune. */
    perk0?: number | null;
    /** Post game rune stats. */
    perk0Var1?: number | null;
    /** Post game rune stats. */
    perk0Var2?: number | null;
    /** Post game rune stats. */
    perk0Var3?: number | null;
    /** Primary path rune. */
    perk1?: number | null;
    /** Post game rune stats. */
    perk1Var1?: number | null;
    /** Post game rune stats. */
    perk1Var2?: number | null;
    /** Post game rune stats. */
    perk1Var3?: number | null;
    /** Primary path rune. */
    perk2?: number | null;
    /** Post game rune stats. */
    perk2Var1?: number | null;
    /** Post game rune stats. */
    perk2Var2?: number | null;
    /** Post game rune stats. */
    perk2Var3?: number | null;
    /** Primary path rune. */
    perk3?: number | null;
    /** Post game rune stats. */
    perk3Var1?: number | null;
    /** Post game rune stats. */
    perk3Var2?: number | null;
    /** Post game rune stats. */
    perk3Var3?: number | null;
    /** Secondary path rune. */
    perk4?: number | null;
    /** Post game rune stats. */
    perk4Var1?: number | null;
    /** Post game rune stats. */
    perk4Var2?: number | null;
    /** Post game rune stats. */
    perk4Var3?: number | null;
    /** Secondary path rune. */
    perk5?: number | null;
    /** Post game rune stats. */
    perk5Var1?: number | null;
    /** Post game rune stats. */
    perk5Var2?: number | null;
    /** Post game rune stats. */
    perk5Var3?: number | null;
    /** Primary rune path */
    perkPrimaryStyle?: number | null;
    /** Secondary rune path */
    perkSubStyle?: number | null;
    /** First stat rune. */
    statPerk0?: number | null;
    /** Second stat rune. */
    statPerk1?: number | null;
    /** Third stat rune. */
    statPerk2?: number | null;
}

export type ParticipantTimelineDTO = {
    participantId?: number | null;
    /** Creep score difference versus the calculated lane opponent(s) for a specified period. */
    csDiffPerMinDeltas?: { [key: string]: number } | null;
    /** Damage taken for a specified period. */
    damageTakenPerMinDeltas?: { [key: string]: number } | null;
    /** Participant's calculated role.
     (Legal values:  DUO,  NONE,  SOLO,  DUO_CARRY,  DUO_SUPPORT) */
    role?: "DUO" | "NONE" | "SOLO" | "DUO_CARRY" | "DUO_SUPPORT" | null;
    /** Damage taken difference versus the calculated lane opponent(s) for a specified period. */
    damageTakenDiffPerMinDeltas?: { [key: string]: number } | null;
    /** Experience change for a specified period. */
    xpPerMinDeltas?: { [key: string]: number } | null;
    /** Experience difference versus the calculated lane opponent(s) for a specified period. */
    xpDiffPerMinDeltas?: { [key: string]: number } | null;
    /** Participant's calculated lane. MID and BOT are legacy values.
     (Legal values:  MID,  MIDDLE,  TOP,  JUNGLE,  BOT,  BOTTOM) */
    lane?: "MID" | "MIDDLE" | "TOP" | "JUNGLE" | "BOT" | "BOTTOM" | null;
    /** Creeps for a specified period. */
    creepsPerMinDeltas?: { [key: string]: number } | null;
    /** Gold for a specified period. */
    goldPerMinDeltas?: { [key: string]: number } | null;
}

export type MasteryDTO = {
    rank: number;
    masteryId: number;
}

export type MatchlistDTO = {
    startIndex: number;
    /** There is a known issue that this field doesn't correctly return the total number of games that match the parameters of the request. Please paginate using beginIndex until you reach the end of a player's matchlist. */
    totalGames: number;
    endIndex: number;
    matches: MatchReferenceDTO[];
}

export type MatchReferenceDTO = {
    gameId: number;
    role: string;
    season: number;
    platformId: string;
    champion: number;
    queue: number;
    lane: string;
    timestamp: number;
}

export type MatchTimelineDTO = {
    frames: MatchFrameDTO[];
    frameInterval: number;
}

export type MatchFrameDTO = {
    participantFrames: { [key: string]: MatchParticipantFrameDTO };
    events: MatchEventDTO[];
    timestamp: number;
}

export type MatchParticipantFrameDTO = {
    participantId: number;
    minionsKilled: number;
    teamScore?: number | null;
    dominionScore?: number | null;
    totalGold: number;
    level: number;
    xp: number;
    currentGold: number;
    position?: MatchPositionDTO | null;
    jungleMinionsKilled: number;
}

export type MatchPositionDTO = {
    x: number;
    y: number;
}

export type MatchEventDTO = {
    laneType?: string | null;
    skillSlot?: number | null;
    ascendedType?: string | null;
    creatorId?: number | null;
    afterId?: number | null;
    eventType?: string | null;
    /** (Legal values:  CHAMPION_KILL,  WARD_PLACED,  WARD_KILL,  BUILDING_KILL,  ELITE_MONSTER_KILL,  ITEM_PURCHASED,  ITEM_SOLD,  ITEM_DESTROYED,  ITEM_UNDO,  SKILL_LEVEL_UP,  ASCENDED_EVENT,  CAPTURE_POINT,  PORO_KING_SUMMON) */
    type:
        | "CHAMPION_KILL"
        | "WARD_PLACED"
        | "WARD_KILL"
        | "BUILDING_KILL"
        | "ELITE_MONSTER_KILL"
        | "ITEM_PURCHASED"
        | "ITEM_SOLD"
        | "ITEM_DESTROYED"
        | "ITEM_UNDO"
        | "SKILL_LEVEL_UP"
        | "ASCENDED_EVENT"
        | "CAPTURE_POINT"
        | "PORO_KING_SUMMON";
    levelUpType?: string | null;
    wardType?: string | null;
    participantId?: number | null;
    towerType?: string | null;
    itemId?: number | null;
    beforeId?: number | null;
    pointCaptured?: string | null;
    monsterType?: string | null;
    monsterSubType?: string | null;
    teamId?: number | null;
    position?: MatchPositionDTO | null;
    killerId?: number | null;
    timestamp: number;
    assistingParticipantIds?: number[] | null;
    buildingType?: string | null;
    victimId?: number | null;
}


export type CurrentGameInfoDTO = {
    /** The ID of the game */
    gameId: number;
    /** The game export type */
    gameType: string;
    /** The game start time represented in epoch milliseconds */
    gameStartTime: number;
    /** The ID of the map */
    mapId: number;
    /** The amount of time in seconds that has passed since the game started */
    gameLength: number;
    /** The ID of the platform on which the game is being played */
    platformId: string;
    /** The game mode */
    gameMode: string;
    /** Banned champion information */
    bannedChampions: BannedChampionDTO[];
    /** The queue export type (queue types are documented on the Game Constants page) */
    gameQueueConfigId?: number | null;
    /** The observer information */
    observers: ObserverDTO;
    /** The participant information */
    participants: CurrentGameParticipantDTO[];
}

export type BannedChampionDTO = {
    /** The turn during which the champion was banned */
    pickTurn: number;
    /** The ID of the banned champion */
    championId: number;
    /** The ID of the team that banned the champion */
    teamId: number;
}

export type ObserverDTO = {
    /** Key used to decrypt the spectator grid game data for playback */
    encryptionKey: string;
}

export type CurrentGameParticipantDTO = {
    /** The ID of the champion played by this participant */
    championId: number;
    /** Perks/Runes Reforged Information */
    perks: PerksDTO;
    /** The ID of the profile icon used by this participant */
    profileIconId: number;
    /** Flag indicating whether or not this participant is a bot */
    bot: boolean;
    /** The team ID of this participant, indicating the participant's team */
    teamId: number;
    /** The summoner name of this participant */
    summonerName: string;
    /** The encrypted summoner ID of this participant */
    summonerId: string;
    /** The ID of the first summoner spell used by this participant */
    spell1Id: number;
    /** The ID of the second summoner spell used by this participant */
    spell2Id: number;
    /** List of Game Customizations */
    gameCustomizationObjects: GameCustomizationObjectDTO[];
}

export type PerksDTO = {
    /** IDs of the perks/runes assigned. */
    perkIds: number[];
    /** Primary runes path */
    perkStyle: number;
    /** Secondary runes path */
    perkSubStyle: number;
}

export type GameCustomizationObjectDTO = {
    /** Category identifier for Game Customization */
    category: string;
    /** Game Customization content */
    content: string;
}

export type DamageDTO = {
    /** PUUID */
    receiver: string;
    damage: number;
    legshots: number;
    bodyshots: number;
    headshots: number;
}

export type AbilityDTO = {
    grenadeEffects: string;
    ability1Effects: string;
    ability2Effects: string;
    ultimateEffects: string;
}

export enum LOCALE {
    cs_CZ = "cs_CZ", // Czech (Czech Republic)
    el_GR = "el_GR", // Greek (Greece)
    pl_PL = "pl_PL", // Polish (Poland)
    ro_RO = "ro_RO", // Romanian (Romania)
    hu_HU = "hu_HU", // Hungarian (Hungary)
    en_GB = "en_GB", // English (United Kingdom)
    de_DE = "de_DE", // German (Germany)
    es_ES = "es_ES", // Spanish (Spain)
    it_IT = "it_IT", // Italian (Italy)
    fr_FR = "fr_FR", // French (France)
    ja_JP = "ja_JP", // Japanese (Japan)
    ko_KR = "ko_KR", // Korean (Korea)
    es_MX = "es_MX", // Spanish (Mexico)
    es_AR = "es_AR", // Spanish (Argentina)
    pt_BR = "pt_BR", // Portuguese (Brazil)
    en_US = "en_US", // English (United States)
    en_AU = "en_AU", // English (Australia)
    ru_RU = "ru_RU", // Russian (Russia)
    tr_TR = "tr_TR", // Turkish (Turkey)
    ms_MY = "ms_MY", // Malay (Malaysia)
    en_PH = "en_PH", // English (Republic of the Philippines)
    en_SG = "en_SG", // English (Singapore)
    th_TH = "th_TH", // Thai (Thailand)
    vn_VN = "vn_VN", // Vietnamese (Viet Nam)
    id_ID = "id_ID", // Indonesian (Indonesia)
    zh_MY = "zh_MY", // Chinese (Malaysia)
    zh_CN = "zh_CN", // Chinese (China)
    zh_TW = "zh_TW", // Chinese (Taiwan)
}

export type DDragonWrapper = {
    type: string;
    format?: string;
    version: string;
}

export type DDragonImageDTO = {
    id?: number; // Only really used for the ProfileIcon. Should we create an entire interface just for that or leave it here as an optional?
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}


export type DDragonMapDataDTO = {
    MapName: string;
    MapId: string;
    image: DDragonImageDTO;
}

export type DDragonChampionSpellDTO = {
    costBurn: string;
    key: string;
    summonerLevel: number;
    modes: string[];
}

export type DDragonRealmsDTO = {
    n: {
        item: string;
        rune: string;
        mastery: string;
        summoner: string;
        champion: string;
        profileicon: string;
        map: string;
        language: string;
        sticker: string;
    };
    v: string;
    l: string;
    cdn: string;
    dd: string;
    lg: string;
    css: string;
    profileiconmax: number;
    store: null; // This is just null on every server I checked. Always exists, but always null.
}

export type DDragonRunesReforgedDTO = {
    id: number;
    key: string;
    icon: string;
    name: string;
    slots: DDragonRunesReforgedSlotDTO[];
}
export type DDragonRunesReforgedSlotDTO = {
    runes: DDragonRunesReforgedRuneDTO[];
}
export type DDragonRunesReforgedRuneDTO = {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
}

export type DDragonItemDTO = {
    name: string;
    rune: {
        isrune: boolean;
        tier: number;
        type: string;
    };
    gold: {
        base: number;
        total: number;
        sell: number;
        purchasable: boolean;
    };
    group: string;
    description: string;
    colloq: string;
    plaintext: string;
    consumed: boolean;
    stacks: number;
    depth: number;
    consumeOnFull: boolean;
    from: string[];
    into: string[];
    image: DDragonImageDTO;
    specialRecipe: number;
    inStore: boolean;
    hideFromAll: boolean;
    requiredChampion: string;
    requiredAlly: string;
    stats: {
        FlatHPPoolMod?: number;
        rFlatHPModPerLevel?: number;
        FlatMPPoolMod?: number;
        rFlatMPModPerLevel?: number;
        PercentHPPoolMod?: number;
        PercentMPPoolMod?: number;
        FlatHPRegenMod?: number;
        rFlatHPRegenModPerLevel?: number;
        PercentHPRegenMod?: number;
        FlatMPRegenMod?: number;
        rFlatMPRegenModPerLevel?: number;
        PercentMPRegenMod?: number;
        FlatArmorMod?: number;
        rFlatArmorModPerLevel?: number;
        PercentArmorMod?: number;
        rFlatArmorPenetrationMod?: number;
        rFlatArmorPenetrationModPerLevel?: number;
        rPercentArmorPenetrationMod?: number;
        rPercentArmorPenetrationModPerLevel?: number;
        FlatPhysicalDamageMod?: number;
        rFlatPhysicalDamageModPerLevel?: number;
        PercentPhysicalDamageMod?: number;
        FlatMagicDamageMod?: number;
        rFlatMagicDamageModPerLevel?: number;
        PercentMagicDamageMod?: number;
        FlatMovementSpeedMod?: number;
        rFlatMovementSpeedModPerLevel?: number;
        PercentMovementSpeedMod?: number;
        rPercentMovementSpeedModPerLevel?: number;
        FlatAttackSpeedMod?: number;
        PercentAttackSpeedMod?: number;
        rPercentAttackSpeedModPerLevel?: number;
        rFlatDodgeMod?: number;
        rFlatDodgeModPerLevel?: number;
        PercentDodgeMod?: number;
        FlatCritChanceMod?: number;
        rFlatCritChanceModPerLevel?: number;
        PercentCritChanceMod?: number;
        FlatCritDamageMod?: number;
        rFlatCritDamageModPerLevel?: number;
        PercentCritDamageMod?: number;
        FlatBlockMod?: number;
        PercentBlockMod?: number;
        FlatSpellBlockMod?: number;
        rFlatSpellBlockModPerLevel?: number;
        PercentSpellBlockMod?: number;
        FlatEXPBonus?: number;
        PercentEXPBonus?: number;
        rPercentCooldownMod?: number;
        rPercentCooldownModPerLevel?: number;
        rFlatTimeDeadMod?: number;
        rFlatTimeDeadModPerLevel?: number;
        rPercentTimeDeadMod?: number;
        rPercentTimeDeadModPerLevel?: number;
        rFlatGoldPer10Mod?: number;
        rFlatMagicPenetrationMod?: number;
        rFlatMagicPenetrationModPerLevel?: number;
        rPercentMagicPenetrationMod?: number;
        rPercentMagicPenetrationModPerLevel?: number;
        FlatEnergyRegenMod?: number;
        rFlatEnergyRegenModPerLevel?: number;
        FlatEnergyPoolMod?: number;
        rFlatEnergyModPerLevel?: number;
        PercentLifeStealMod?: number;
        PercentSpellVampMod?: number;
    };
    tags: string[];
    maps: { [key: string]: boolean };
    effect?: { [key: string]: string };
}

export type DDragonChampionInfoDTO = {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
}
export type DDragonChampionStatsDTO = {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
}

export type DDragonChampionListDataDTO = {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: DDragonChampionInfoDTO;
    image: DDragonImageDTO;
    tags: string[];
    partype: string;
    stats: DDragonChampionStatsDTO;
}

export type DDragonSpellWrapper = {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    datavalues: {};
    effect: number[][];
    effectBurn: string[];
    vars: {
        link: string;
        coeff: number;
        key: string;
    }[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: DDragonImageDTO;
    resource: string;
}

export type DDragonChampionDataDTO = {
    id: string;
    key: string;
    name: string;
    title: string;
    image: DDragonImageDTO;
    skins: {
        id: string;
        num: number;
        name: string;
        chromas: boolean;
    }[];
    lore: string;
    blurb: string;
    allytips: string[];
    enemytips: string[];
    tags: string[];
    partype: string;
    info: DDragonChampionInfoDTO;
    stats: DDragonChampionStatsDTO;
    spells: DDragonChampionSpellDTO[];
    passive: {
        name: string;
        description: string;
        image: DDragonImageDTO;
    };
    recommended: {
        champion?: string;
        title?: string;
        map?: string;
        mode?: string;
        type: string;
        customTag: string;
        requiredPerk: string;
        sortrank: string;
        extensionPage: boolean;
        customPanel: string;
        customPanelCurrencyType?: string;
        customPanelBuffCurrencyName?: string;
        blocks: {
            type: string;
            recMath: boolean;
            recSteps?: boolean;
            minSummonerLevel: number;
            maxSummonerLevel: number;
            showIfSummonerSpell: string;
            hideIfSummonerSpell: string;
            appendAfterSection?: string;
            visibleWithAllOf?: string[];
            hiddenWithAnyOf?: string[];
            items: {
                id: string;
                count: number;
                hideCount: boolean;
            }[];
        }[];
    }[];
}

export type CrunchySummoner = {
    summoner: SummonerDTO;
    matchList: MatchDTO[];
    summonerStats: LeagueEntryDTO[];
}